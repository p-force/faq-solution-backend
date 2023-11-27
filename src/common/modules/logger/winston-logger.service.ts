import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import moment from 'moment';
import { TransformableInfo } from 'logform';
import { LOGGER_CONFIG_KEY, LoggerConfigType } from '../../config/logger.config';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: Logger;
  private dateString: string;

  constructor(@Inject(LOGGER_CONFIG_KEY) private loggerConfig: LoggerConfigType) {
    this.initTransports();
  }

  private initTransports() {
    this.dateString = moment(new Date()).format('YYYY-MM-DD');

    const options = {
      console: {
        handleExceptions: true,
        level: this.loggerConfig.consoleLogLevel,
        format: format.combine(format.colorize(), format.printf(this.logFormat)),
        pretty: true,
      },
      file: {
        filename: `./logs/${this.dateString}.log`,
        level: this.loggerConfig.fileLogLevel,
        format: format.combine(format.printf(this.logFormat)),
      },
      fileError: {
        filename: `./logs/${this.dateString}.error.log`,
        level: 'error',
        format: format.combine(format.printf(this.logFormat)),
      },
    };

    this.logger = createLogger({
      exitOnError: false,
      transports: [
        new transports.Console(options.console),
        new transports.File(options.file),
        new transports.File(options.fileError),
      ],
    });
  }

  private isFileNameActual(): boolean {
    return this.dateString == moment(new Date()).format('YYYY-MM-DD');
  }

  private logFormat(info: TransformableInfo) {
    return `${new Date().toISOString().slice(0, 19).replace('T', ' ')} [${info.level}] ${
      info.service ?? ''
    } - ${info.message}`;
  }

  log(message: string, className: string) {
    if (!this.isFileNameActual()) this.initTransports();
    this.logger.log('info', message, { service: className });
  }

  debug(message: string, className: string) {
    if (!this.isFileNameActual()) this.initTransports();
    this.logger.debug(message, { service: className });
  }

  error(message: string, className: string) {
    if (!this.isFileNameActual()) this.initTransports();
    this.logger.error(message, { service: className });
  }

  warn(message: string, className: string) {
    if (!this.isFileNameActual()) this.initTransports();
    this.logger.warn(message, { service: className });
  }
}
