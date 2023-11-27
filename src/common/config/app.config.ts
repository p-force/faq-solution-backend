import { ConfigType, registerAs } from '@nestjs/config';
import ms from 'ms';

export const appConfig = registerAs('app', () => ({
  appUrl: process.env.APP_URL,
  nestVersioningEnable: process.env.NEST_VERSIONING_ENABLE.toUpperCase() === 'TRUE',
  defaultVersion: process.env.NEST_VERSIONING_DEFAULT_VERSION,
  maxLimit: +process.env.MAX_LIMIT,

  jwtSecret: process.env.JWT_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  jwtRefreshExpiresIn: +ms(process.env.JWT_REFRESH_EXPIRES_IN),

  adminEmail: process.env.SYSTEM_ADMIN_EMAIL,
  adminPassword: process.env.SYSTEM_ADMIN_PASSWORD,

  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USERNAME,
  dbPass: process.env.DB_PASSWORD,

  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT),
}));

export const APP_CONFIG_KEY = appConfig.KEY;

export type AppConfigType = ConfigType<typeof appConfig>;
