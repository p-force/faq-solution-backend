import Bull from 'bull';

export const telegramErrorMessages = {
  noBotTokenProvided:
    'Модуль подключен, но в настройках не указан токен бота. Инициализация прервана',
  accountLinkError:
    'Здравствуйте! К сожалению не удалось связать вашу учетную запись с этим аккаунтом телеграм. Пожалуйста, обратитесь к администратору',
  noUserTokenProvided:
    'Здравствуйте! Вы не указали ваш токен доступа. Для подписки на оповещения используйте ссылка на сайте или обратитесь к администратору',
  jobFailed: (id: Bull.JobId, chatId: number, error: string) =>
    `Задача ${id} отправки сообщения в телеграм чат ${chatId} провалилась. Ошибка: ${error}`,
};
