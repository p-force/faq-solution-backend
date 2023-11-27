import { ConfigType, registerAs } from '@nestjs/config';

export const telegramConfig = registerAs('telegram', () => ({
  token: process.env.TELEGRAM_TOKEN,
  jobBackoff: parseInt(process.env.TELEGRAM_JOB_BACKOFF),
  jobAttempts: parseInt(process.env.TELEGRAM_JOB_ATTEMPTS),
  jobFailAge: parseInt(process.env.TELEGRAM_JOB_FAIL_DEL_AGE),
}));
export const TELEGRAM_CONFIG_KEY = telegramConfig.KEY;

export type TelegramConfigType = ConfigType<typeof telegramConfig>;
