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
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh.dto';
import { LogoutDto } from './dto/logout.dto';
import { ConfigService } from '@nestjs/config';
import { Token } from './dto/token.dto';
import { SecurityConfig } from './dto/config';
import { UserTokens } from './entities/user_tokens.entity';

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
    private readonly configService: ConfigService,
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

  async login(loginDto: LoginFormDto): Promise<{ accessToken: string }> {
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
    const payload = { sub: user.id, username: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async logout(logoutDto: LogoutDto) {
    try {
      const decoded = this.jwtService.verify(logoutDto.refreshToken);
      if (!decoded) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: AuthStatusMessages.EXPIRED_TOKEN,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: AuthStatusMessages.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }
  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: securityConfig!.refreshIn,
    });
  }

  async refreshToken(tokenDto: RefreshTokenDto): Promise<Token> {
    const { userId } = this.jwtService.verify(tokenDto.refreshToken, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return this.generateTokens({
      userId,
    });
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
