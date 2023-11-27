import { ConfigType, registerAs } from '@nestjs/config';

export const mailerConfig = registerAs('mailer', () => ({
  host: process.env.MAILER_HOST,
  port: +process.env.MAILER_PORT,
  secure: process.env.MAILER_SECURE.toUpperCase() === 'TRUE',
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
  from: process.env.MAILER_FROM,
  templatesDir: process.env.MAILER_TEMPLATES_DIR,
  jobBackoff: parseInt(process.env.MAILER_JOB_BACKOFF),
  jobAttempts: parseInt(process.env.MAILER_JOB_ATTEMPTS),
  jobFailAge: parseInt(process.env.MAILER_JOB_FAIL_DEL_AGE),
  managerEmail: process.env.MANAGER_EMAIL,
}));
export const MAILER_CONFIG_KEY = mailerConfig.KEY;

export type MailerConfigType = ConfigType<typeof mailerConfig>;
