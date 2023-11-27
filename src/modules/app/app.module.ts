import { Module } from '@nestjs/common';
import { ContactFormModule } from '../contactForm/contactForm.module';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from '../../common/config';
import { DbModule } from '../../common/modules/db/db.module';
import { LoggerModule } from '../../common/modules/logger/logger.module';
import { AppController } from './app.controller';

@Module({
  imports: [ContactFormModule, DbModule, LoggerModule, ConfigModule.forRoot(configModuleOptions)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
