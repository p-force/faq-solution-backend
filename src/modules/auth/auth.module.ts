import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../placeAnOrderForm/entities/user.entity';
import { MailerModule } from 'src/common/modules/mailer/mailer.module';
import { AuthController } from './auth.controller';
import { RecoveryPasswordCode } from './entities/recovery.entity';
import { UserTokens } from './entities/user_tokens.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Users, RecoveryPasswordCode, UserTokens]), MailerModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
