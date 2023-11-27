import { validateErrorMessage } from './validate-error.messages';
import { serverErrorMessages } from './server-error.messages';
import { authErrorMessages } from './auth-error.messages';
import { userErrorMessages } from './user-error.messages';
import { telegramErrorMessages } from './telegram-error.messages';
import { mailerErrorMessages } from './mailer-error.messages';
import { smsErrorMessages } from './sms-error.messages';

export const errorMessage = {
  validate: validateErrorMessage,
  server: serverErrorMessages,
  auth: authErrorMessages,
  user: userErrorMessages,
  telegram: telegramErrorMessages,
  mailer: mailerErrorMessages,
  sms: smsErrorMessages,
};
