import { Inject, Injectable } from '@nestjs/common';
import { MAILER_CONFIG_KEY, MailerConfigType } from '../../config/mailer.config';
import * as fs from 'fs';
import { streamToString } from '../../utils/stream-to-string';
import path from 'path';
import * as handlebars from 'handlebars';
import { WinstonLoggerService } from '../logger/winston-logger.service';
import { makeError } from '../../utils/make-error';
import { errorsEnum } from '../../enum/errors.enum';
import { SendMailInterface, TemplateVarsType } from './interfaces/send-mail.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { messages } from '../../messages';

@Injectable()
export class MailerService {
  constructor(
    @InjectQueue('mail') private readonly mailQueue: Queue,
    @Inject(MAILER_CONFIG_KEY) private readonly mailerConfig: MailerConfigType,
    private readonly logger: WinstonLoggerService,
  ) {}

  /**
   * Пытается прочитать шаблон из директории, указанной в конфигурации, скопилировать его с переменными и вернуть
   * @param templateName
   * @param templateVars
   * @private
   */
  private async renderTemplate(templateName: string, templateVars?: TemplateVarsType) {
    try {
      return handlebars.compile(
        await streamToString(
          fs.createReadStream(path.join(process.cwd(), 'templates', templateName + '.hbs'), {
            encoding: 'utf-8',
          }),
        ),
      )(templateVars);
    } catch (err) {
      this.logger.error(
        messages.errorMessage.mailer.templateNotFound(err.path),
        MailerService.name,
      );
      throw makeError(errorsEnum.NOT_FOUND, {
        message: messages.errorMessage.mailer.templateNotFound(err.path),
      });
    }
  }

  /**
   * Добавить в очередь задачу/задачи на отправку email
   * @param options
   */
  async sendMail(options: SendMailInterface) {
    const html =
      options.htmlTemplate &&
      (await this.renderTemplate(options.htmlTemplate, options.templateVars));

    const text =
      options.textTemplate &&
      (await this.renderTemplate(options.textTemplate, options.templateVars));

    for (const email of options.emails) {
      const { id } = await this.mailQueue.add({
        subject: options.subject,
        from: this.mailerConfig.from,
        to: email,
        html,
        text,
      });
      this.logger.log(messages.successMessage.mailer.jobAdd(id, email), MailerService.name);
    }
  }
}
