import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { WinstonLoggerService } from './winston-logger.service';
import { LOGGER_CONFIG_KEY, LoggerConfigType } from '../../config/logger.config';
import { APP_CONFIG_KEY, AppConfigType } from '../../config/app.config';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly loggerService: WinstonLoggerService,
    @Inject(LOGGER_CONFIG_KEY) private loggerConfig: LoggerConfigType,
    @Inject(APP_CONFIG_KEY) private appConfig: AppConfigType,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { ip, method, originalUrl, body, headers, query, path } = context
      .switchToHttp()
      .getRequest();
    const response = context.switchToHttp().getResponse();
    const now = Date.now();
    const ctx = context.getClass().name;

    this.loggerService.log(
      `Request from IP: ${ip} ${method.toUpperCase()} ${path} URL: ${originalUrl} `,
      ctx,
    );

    if (this.loggerConfig.includeHeaders) {
      this.loggerService.debug(`HEADERS: ${JSON.stringify(headers, null, 4)}`, ctx);
    }

    if (this.loggerConfig.includeRequest) {
      this.loggerService.debug(`Request body: ${JSON.stringify(body, null, 4)}`, ctx);
    }

    if (this.loggerConfig.includeQuery) {
      this.loggerService.debug(`Request query: ${JSON.stringify(query, null, 4)}`, ctx);
    }

    return next.handle().pipe(
      tap((data) => {
        this.loggerService.debug(`Response in ${Date.now() - now} ms`, ctx);
        if (this.loggerConfig.includeResponse) {
          this.loggerService.debug(response.statusCode, ctx);
          this.loggerService.debug(data, ctx);
        }
      }),
    );
  }
}
