import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../placeAnOrderForm/entities/user.entity';
import { MailerModule } from 'src/common/modules/mailer/mailer.module';
import { AuthController } from './auth.controller';
import { RecoveryPasswordCode } from './entities/recovery.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './dto/jwt.constants';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users, RecoveryPasswordCode]),
    MailerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `${jwtConstants.expiresIn}` },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
