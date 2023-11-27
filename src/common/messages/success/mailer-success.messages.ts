import Bull from 'bull';

export const mailerSuccessMessages = {
  jobAdd: (id: Bull.JobId, email: string) => `Добавлена задача ${id} отправки email на ${email}`,
  jobInProgress: (id: Bull.JobId, email: string) =>
    `Обрабатывается задача ${id} отправки email на ${email}`,
  jobCompleted: (id: Bull.JobId, email: string) =>
    `Задача ${id} отправки email на ${email} выполнена успешно.`,
};
