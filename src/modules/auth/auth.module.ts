import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../placeAnOrderForm/entities/user.entity';
import { MailerModule } from 'src/common/modules/mailer/mailer.module';
import { AuthController } from './auth.controller';
import { RecoveryPasswordCode } from './recovery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, RecoveryPasswordCode]), MailerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
