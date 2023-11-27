import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailOptions, Options } from 'nodemailer/lib/smtp-transport';
import { Inject } from '@nestjs/common';
import { MAILER_CONFIG_KEY, MailerConfigType } from '../../config/mailer.config';
import nodemailer from 'nodemailer';
import { messages } from '../../messages';
import { WinstonLoggerService } from '../logger/winston-logger.service';

@Processor('mail')
export class MailerConsumer {
  constructor(
    private readonly logger: WinstonLoggerService,
    @Inject(MAILER_CONFIG_KEY) private mailerConfig: MailerConfigType,
  ) {
    const smtpOptions: Options = {
      host: this.mailerConfig.host,
      port: this.mailerConfig.port,
      secure: this.mailerConfig.secure,
      auth: this.mailerConfig.auth,
    };

    this.smtp = nodemailer.createTransport(smtpOptions);
  }

  private smtp: nodemailer.Transporter;

  @OnQueueActive()
  onActivate(job: Job<MailOptions>) {
    this.logger.log(
      messages.successMessage.mailer.jobInProgress(job.id, job.data.to.toString()),
      MailerConsumer.name,
    );
  }

  @OnQueueFailed()
  onFailed(job: Job<MailOptions>, err: Error) {
    this.logger.error(
      messages.errorMessage.mailer.jobFailed(job.id, job.data.to.toString(), err.message),
      MailerConsumer.name,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job<MailOptions>) {
    this.logger.log(
      messages.successMessage.mailer.jobCompleted(job.id, job.data.to.toString()),
      MailerConsumer.name,
    );
  }

  @Process()
  async process(job: Job<MailOptions>) {
    await this.smtp.sendMail(job.data);
  }
}
