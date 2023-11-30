import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../placeAnOrderForm/entities/user.entity';
import { Repository } from 'typeorm';
import { MailerConfigType, MAILER_CONFIG_KEY } from 'src/common/config/mailer.config';
import { MailerService } from 'src/common/modules/mailer/mailer.service';
import { AuthFormDto } from './dto/users.dto';
import bcrypt from 'bcryptjs';
import { AuthStatusMessages } from './dto/auth.constants';
import { LoginFormDto } from './dto/login.dto';
import { RecoveryPasswordCode } from './entities/recovery.entity';
import { UserTokens } from './entities/user_tokens.entity';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh.dto';
import { LogoutDto } from './dto/logout.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly authRepository: Repository<Users>,
    @InjectRepository(UserTokens) private readonly tokenRepository: Repository<UserTokens>,
    @InjectRepository(RecoveryPasswordCode)
    private readonly recoveryPasswordRepository: Repository<RecoveryPasswordCode>,
    private jwtService: JwtService,
    @Inject(MAILER_CONFIG_KEY)
    private readonly mailConfig: MailerConfigType,
    private readonly mailerService: MailerService,
  ) {}
  async registration(authDto: AuthFormDto): Promise<string> {
    const user = await this.authRepository.findOne({
      where: { email: authDto.email },
    });
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.ALREADY_EXISTS,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(authDto.password, 10);
    await this.authRepository.save({ ...authDto, password: hashedPassword });

    await this.mailerService.sendMail({
      subject: 'New registration form',
      emails: [this.mailConfig.managerEmail],
      htmlTemplate: 'new-reg',
      templateVars: {
        nameSurname: authDto.fullName,
        email: authDto.email,
        phone: authDto.phone,
        password: authDto.password,
      },
    });

    return AuthStatusMessages.REGISTERED_SUCCESSFULLY;
  }

  generateRecoveryCode() {
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }
    return code;
  }

  async login(loginDto: LoginFormDto): Promise<string> {
    const user = await this.authRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.NOT_FOUND,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.NOT_FOUND,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { userId: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return token;
  }

  async logout(logoutDto: LogoutDto): Promise<string> {
    const token = await this.tokenRepository.findOne({
      where: { userId: logoutDto.userId, refreshToken: logoutDto.refreshToken },
    });

    if (!token) {
      throw new HttpException(AuthStatusMessages.NOT_FOUND, HttpStatus.UNAUTHORIZED);
    }

    await this.tokenRepository.update(
      { id: token.id },
      { deletedAt: new Date(), expiresAt: new Date() },
    );

    return AuthStatusMessages.UNAUTHORIZED_SUCCESSFULLY;
  }

  async refreshToken(tokenDto: RefreshTokenDto): Promise<string> {
    const userToken = await this.tokenRepository.findOne({
      where: { userId: tokenDto.userId },
    });

    if (!userToken) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.NOT_FOUND,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userToken.refreshToken !== tokenDto.refreshToken) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.INCORRECT_CODE,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Проверка срока действия refresh токена
    const currentTime = new Date();
    if (currentTime > userToken.expiresAt) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.EXPIRED_TOKEN,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newAccessToken = this.jwtService.sign({ userId: tokenDto.userId });

    return newAccessToken;
  }

  async recoveryPassword(email: string): Promise<string> {
    const user = await this.authRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.NOT_FOUND,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const existCode = await this.recoveryPasswordRepository.findOne({
      where: { userId: user.id, deletedAt: null },
    });
    if (existCode) {
      await this.recoveryPasswordRepository.update(existCode.id, {
        deletedAt: new Date(),
      });
    }
    const recoveryCode = this.generateRecoveryCode();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 30); // Добавляем 30 минут к текущему времени

    await this.recoveryPasswordRepository.save({
      userId: user.id,
      code: recoveryCode,
      deletedAt: null,
      expiresAt: expirationTime, // Устанавливаем время истечения
    });

    await this.mailerService.sendMail({
      subject: 'Password recovery',
      emails: [email],
      htmlTemplate: 'password-recovery',
      templateVars: {
        code: recoveryCode,
      },
    });
    return AuthStatusMessages.CREATED;
  }
  async setPassword({ code, email, newPassword }) {
    const user = await this.authRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.NOT_FOUND,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const existCode = await this.recoveryPasswordRepository.findOne({
      where: { userId: user.id, deletedAt: null },
    });
    if (!existCode) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.CODE_NOT_FOUND,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (existCode.code !== code) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.INCORRECT_CODE,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (existCode.expiresAt < new Date()) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.EXPIRED_CODE,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.recoveryPasswordRepository.update(existCode.id, {
      deletedAt: new Date(),
    });
    const comparedPassword = await bcrypt.compare(newPassword, user.password);
    if (comparedPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: AuthStatusMessages.ERROR_SET_PASSWORD,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.authRepository.update(user.id, { password: hashedPassword });
    await this.recoveryPasswordRepository.update(existCode.id, {
      deletedAt: new Date(),
    });

    return AuthStatusMessages.PASSWORD_UPDATED_SUCCESSFULLY;
  }
}
