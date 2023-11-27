import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactForm } from './entities/contactForm.entity';
import { CallRequest } from './entities/callRequest.entity';
import { Repository } from 'typeorm';
import { MailerConfigType, MAILER_CONFIG_KEY } from 'src/common/config/mailer.config';
import { MailerService } from 'src/common/modules/mailer/mailer.service';
import { ContactFormDto } from './dto/contactForm.dto';
import { ContactStatusMessages } from './dto/contactForm.constant';
import { RequestCallDTO } from './dto/callRecuest.dto';

@Injectable()
export class ContactFormService {
  constructor(
    @InjectRepository(ContactForm) private readonly subscribersRepository: Repository<ContactForm>,
    @InjectRepository(CallRequest)
    private readonly callRequestRep: Repository<CallRequest>,
    @Inject(MAILER_CONFIG_KEY)
    private readonly mailConfig: MailerConfigType,
    private readonly mailerService: MailerService,
  ) {}
  async create(createContactDto: ContactFormDto): Promise<string> {
    await this.subscribersRepository.save(createContactDto);

    // await this.mailerService.sendMail({
    //   subject: 'New merchant form',
    //   emails: [this.mailConfig.managerEmail],
    //   htmlTemplate: 'merchant',
    //   templateVars: {
    //     nameSurname: createContactDto.fullName,
    //     email: createContactDto.email,
    //     phoneNumber: createContactDto.phoneNumber,
    //     topic: createContactDto.topic,
    //     message: createContactDto.message,
    //   },
    // });

    return ContactStatusMessages.CREATE_REQUEST_SUCCESS;
  }

  async createCallRequest(dto: RequestCallDTO): Promise<string> {
    await this.callRequestRep.save(dto);

    await this.mailerService.sendMail({
      subject: 'New call form',
      emails: [this.mailConfig.managerEmail],
      htmlTemplate: 'call',
      templateVars: {
        nameSurname: dto.nameSurname,
        phone: dto.phone,
      },
    });

    return ContactStatusMessages.CREATE_REQUEST_SUCCESS;
  }
}
