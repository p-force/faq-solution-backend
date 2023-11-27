import { authSuccessMessages } from './auth-success.messages';
import { serverSuccessMessages } from './server-success.messages';
import { SmsSuccessMessages } from './sms-success.messages';
import { TelegramSuccessMessages } from './telegram-success.messages';
import { mailerSuccessMessages } from './mailer-success.messages';

export const successMessage = {
  auth: authSuccessMessages,
  server: serverSuccessMessages,
  sms: SmsSuccessMessages,
  telegram: TelegramSuccessMessages,
  mailer: mailerSuccessMessages,
};
