import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import { appConfig } from './app.config';
import { swaggerConfig } from './swagger.config';
import { loggerConfig } from './logger.config';
import { mailerConfig } from './mailer.config';
import { telegramConfig } from './telegram.config';
import { smsConfig } from './sms.config';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    PORT: Joi.number().port().required(),
    HOST: Joi.string().required(),
    APP_URL: Joi.string().required(),
    NEST_VERSIONING_ENABLE: Joi.boolean().default(false),
    NEST_VERSIONING_DEFAULT_VERSION: Joi.string().default('1'),
    MAX_LIMIT: Joi.number().default(100),

    JWT_SECRET: Joi.string().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRES_IN: Joi.string().default('10m'),
    JWT_REFRESH_EXPIRES_IN: Joi.string().default('30d'),

    SYSTEM_ADMIN_EMAIL: Joi.string().required(),
    SYSTEM_ADMIN_PASSWORD: Joi.string().required(),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),

    REDIS_HOST: Joi.string().default('localhost'),
    REDIS_PORT: Joi.number().default(6379),

    SWAGGER_ENABLE: Joi.boolean().default(false),
    SWAGGER_AUTH: Joi.boolean().default(false),
    SWAGGER_TITLE: Joi.string().default('API'),
    SWAGGER_DESCRIPTION: Joi.string().default('API DESCRIPTION'),
    SWAGGER_VERSION: Joi.string().default('1.0'),
    SWAGGER_PATH: Joi.string().default('/api-docs'),
    SWAGGER_USER: Joi.string().default('swagger'),
    SWAGGER_PASS: Joi.string().default('swagger'),

    LOG_CONSOLE_LEVEL: Joi.string().default('debug'),
    LOG_FILE_LEVEL: Joi.string().default('info'),
    LOG_INCLUDE_REQUEST: Joi.boolean().default(false),
    LOG_INCLUDE_RESPONSE: Joi.boolean().default(false),
    LOG_INCLUDE_HEADERS: Joi.boolean().default(false),
    LOG_INCLUDE_QUERY: Joi.boolean().default(false),

    MAILER_HOST: Joi.string().default(''),
    MAILER_PORT: Joi.number().default(25),
    MAILER_SECURE: Joi.boolean().default(false),
    MAILER_USER: Joi.string().default(''),
    MAILER_PASS: Joi.string().default(''),
    MAILER_TEMPLATES_DIR: Joi.string().default('templates'),
    MAILER_FROM: Joi.string().default(`"NestJS App" <test@test.com>`),
    MAILER_JOB_BACKOFF: Joi.number().default(5000),
    MAILER_JOB_ATTEMPTS: Joi.number().default(5),
    MAILER_JOB_FAIL_DEL_AGE: Joi.number().default(300),

    TELEGRAM_TOKEN: Joi.string().default(''),
    TELEGRAM_JOB_BACKOFF: Joi.number().default(5000),
    TELEGRAM_JOB_ATTEMPTS: Joi.number().default(5),
    TELEGRAM_JOB_FAIL_DEL_AGE: Joi.number().default(300),

    SMS_TOKEN: Joi.string(),
    SMS_SENDER: Joi.string(),
    SMS_JOB_BACKOFF: Joi.number(),
    SMS_JOB_ATTEMPTS: Joi.number(),
    SMS_JOB_FAIL_DEL_AGE: Joi.number(),
    SMS_MAX_VERIFY_ATTEMPTS: Joi.number(),
    SMS_MIN_VERIFY_DELAY: Joi.number(),
  }),
  load: [appConfig, swaggerConfig, loggerConfig, mailerConfig, telegramConfig, smsConfig],
};
