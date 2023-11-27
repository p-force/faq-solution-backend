import { ConfigType, registerAs } from '@nestjs/config';

export const smsConfig = registerAs('sms', () => ({
  token: process.env.SMS_TOKEN,
  sender: process.env.SMS_SENDER,
  jobBackoff: parseInt(process.env.SMS_JOB_BACKOFF),
  jobAttempts: parseInt(process.env.SMS_JOB_ATTEMPTS),
  jobFailAge: parseInt(process.env.SMS_JOB_FAIL_DEL_AGE),
  maxVerifyAttempts: parseInt(process.env.SMS_MAX_VERIFY_ATTEMPTS),
  minVerifyDelay: parseInt(process.env.SMS_MIN_VERIFY_DELAY),
}));
export const SMS_CONFIG_KEY = smsConfig.KEY;

export type SMSConfigType = ConfigType<typeof smsConfig>;
