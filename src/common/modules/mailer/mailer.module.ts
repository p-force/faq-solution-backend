import { Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { APP_CONFIG_KEY, AppConfigType } from '../../config/app.config';
import { MailerConsumer } from './mailer.consumer';
import { MAILER_CONFIG_KEY, MailerConfigType } from '../../config/mailer.config';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [APP_CONFIG_KEY, MAILER_CONFIG_KEY],
      useFactory: (appConfig: AppConfigType, mailerConfig: MailerConfigType) => ({
        redis: {
          host: appConfig.redisHost,
          port: appConfig.redisPort,
        },
        defaultJobOptions: {
          attempts: mailerConfig.jobAttempts,
          backoff: mailerConfig.jobBackoff,
          removeOnComplete: true,
          removeOnFail: mailerConfig.jobFailAge > 0 ? { age: mailerConfig.jobFailAge } : false,
        },
      }),
    }),
    BullModule.registerQueue({ name: 'mail' }),
  ],
  providers: [MailerService, MailerConsumer],
  exports: [MailerService],
})
export class MailerModule {}
