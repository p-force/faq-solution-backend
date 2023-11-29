import { Module } from '@nestjs/common';
import { ContactFormModule } from '../contactForm/contactForm.module';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from '../../common/config';
import { DbModule } from '../../common/modules/db/db.module';
import { LoggerModule } from '../../common/modules/logger/logger.module';
import { AppController } from './app.controller';
import { PlaceAnOrderFormModule } from '../placeAnOrderForm/placeAnOrderForm.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ContactFormModule,
    PlaceAnOrderFormModule,
    AuthModule,
    DbModule,
    LoggerModule,
    ConfigModule.forRoot(configModuleOptions),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
