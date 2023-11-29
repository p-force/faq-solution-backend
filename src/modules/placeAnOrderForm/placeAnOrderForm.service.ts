import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceAnOrderForm } from './entities/placeAnOrderForm.entity';
import { Repository } from 'typeorm';
import { AppConfigType, APP_CONFIG_KEY } from 'src/common/config/app.config';
import { MailerService } from 'src/common/modules/mailer/mailer.service';
import { MailerConfigType, MAILER_CONFIG_KEY } from 'src/common/config/mailer.config';
import { PlaceAnOrderFormDto } from './dto/placeAnOrderForm.dto';
import bcrypt from 'bcryptjs';
import { Users } from './entities/user.entity';

@Injectable()
export class PlaceAnOrderFormService {
  constructor(
    @InjectRepository(PlaceAnOrderForm)
    private placeAnOrderRepository: Repository<PlaceAnOrderForm>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @Inject(APP_CONFIG_KEY)
    private readonly appConfig: AppConfigType,
    @Inject(MAILER_CONFIG_KEY)
    private readonly mailConfig: MailerConfigType,
    private readonly mailerService: MailerService,
  ) {}

  gen_password() {
    const len = 8;
    const result = Math.random()
      .toString(36)
      .slice(2, 2 + len);
    if (!result.match(/[a-zA-Z]/gm)) return this.gen_password();
    if (!result.match(/[0-9]/gm)) return this.gen_password();
    return result;
  }

  async createUser(createUserDto: PlaceAnOrderFormDto): Promise<PlaceAnOrderForm> {
    let user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (!user) {
      const password = this.gen_password();
      const hash = await bcrypt.hash(password, 10);
      user = await this.userRepository.save({
        fullName: createUserDto.fullName,
        email: createUserDto.email,
        password: hash,
      });

      await this.mailerService.sendMail({
        subject: 'Thank you for your order',
        emails: [createUserDto.email],
        htmlTemplate: 'absent-reg',
        templateVars: {
          login: createUserDto.email,
          password: password,
          link: '',
        },
      });
    } else {
      await this.mailerService.sendMail({
        subject: 'Thank you for your order',
        emails: [createUserDto.email],
        htmlTemplate: 'exist-reg',
      });
    }

    const result = await this.placeAnOrderRepository.save(createUserDto);
    await this.mailerService.sendMail({
      subject: 'New reg form',
      emails: [this.mailConfig.managerEmail],
      htmlTemplate: 'new-reg',
      templateVars: {
        nameSurname: createUserDto.fullName,
        email: createUserDto.email,
        service: createUserDto.service,
        deliveryTime: createUserDto.deliveryTime,
        pages: createUserDto.pages,
        coupon: createUserDto.coupon,
        writerAndEditorLevel: createUserDto.writerAndEditorLevel,
        uploadFile: createUserDto.file,
        message: createUserDto.message,
      },
    });
    return result;
  }
}
