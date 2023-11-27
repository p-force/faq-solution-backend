import { Module } from '@nestjs/common';
import { ContactFormService } from './contactForm.service';
import { ContactFormController } from './contactForm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactForm } from './entities/contactForm.entity';
import { CallRequest } from './entities/callRequest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactForm, CallRequest])],
  controllers: [ContactFormController],
  providers: [ContactFormService],
})
export class ContactFormModule {}
