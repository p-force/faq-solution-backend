import { Module } from '@nestjs/common';
import { ContactFormService } from './contactForm.service';
import { ContactFormController } from './contactForm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactForm } from './contactForm.entity';
import { MailerModule } from 'src/common/modules/mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactForm]), MailerModule],
  controllers: [ContactFormController],
  providers: [ContactFormService],
})
export class ContactFormModule {}
