import { Module } from '@nestjs/common';
import { PlaceAnOrderFormService } from './placeAnOrderForm.service';
import { PlaceAnOrderFormController } from './placeAnOrderForm.controller';
import { PlaceAnOrderForm } from './entities/placeAnOrderForm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from 'src/common/modules/mailer/mailer.module';
import { User } from './entities/user.entuty';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceAnOrderForm, User]), MailerModule],
  controllers: [PlaceAnOrderFormController],
  providers: [PlaceAnOrderFormService],
})
export class PlaceAnOrderFormModule {}
