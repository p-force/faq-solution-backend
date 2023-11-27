import Bull from 'bull';

export const TelegramSuccessMessages = {
  botInitStart: 'Инициализация Telegram бота',
  botInitSuccess: 'Инициализация Telegram бота завершена',
  accountLinkSuccess: 'Здравствуйте, вы успешно подписаны на уведомления!',
  jobAdd: (id: Bull.JobId, chatId: number) =>
    `Добавлена задача ${id} отправки сообщения телеграм в чат ${chatId}`,
  jobInProgress: (id: Bull.JobId, chatId: number) =>
    `Обрабатывается задача ${id} отправки сообщения в телеграм чат ${chatId}`,
  jobCompleted: (id: Bull.JobId, chatId: number) =>
    `Задача ${id} отправки сообщения в телеграм чат ${chatId} выполнена успешно.`,
};
