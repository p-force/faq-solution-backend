import { Global, Module } from '@nestjs/common';
import { WinstonLoggerService } from './winston-logger.service';
import { LoggerInterceptor } from './logger.interceptor';

@Global()
@Module({
  imports: [],
  providers: [WinstonLoggerService, LoggerInterceptor],
  exports: [WinstonLoggerService],
  controllers: [],
})
export class LoggerModule {}
