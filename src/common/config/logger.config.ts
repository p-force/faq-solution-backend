import { ConfigType, registerAs } from '@nestjs/config';

export const loggerConfig = registerAs('logger', () => ({
  includeHeaders: process.env.LOG_INCLUDE_HEADERS.toUpperCase() === 'TRUE',
  includeRequest: process.env.LOG_INCLUDE_REQUEST.toUpperCase() === 'TRUE',
  includeResponse: process.env.LOG_INCLUDE_RESPONSE.toUpperCase() === 'TRUE',
  includeQuery: process.env.LOG_INCLUDE_QUERY.toUpperCase() === 'TRUE',
  consoleLogLevel: process.env.LOG_CONSOLE_LEVEL,
  fileLogLevel: process.env.LOG_CONSOLE_LEVEL,
}));
export const LOGGER_CONFIG_KEY = loggerConfig.KEY;

export type LoggerConfigType = ConfigType<typeof loggerConfig>;
