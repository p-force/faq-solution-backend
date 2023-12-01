import { Module } from '@nestjs/common';
import { MyAccountService } from './myAccount.service';
import { MyAccountController } from './myAccount.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceAnOrderForm } from '../placeAnOrderForm/entities/placeAnOrderForm.entity';
import { Users } from '../placeAnOrderForm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceAnOrderForm, Users])],
  controllers: [MyAccountController],
  providers: [MyAccountService],
})
export class MyAccountModule {}
