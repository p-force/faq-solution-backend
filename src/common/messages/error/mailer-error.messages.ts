import Bull from 'bull';

export const mailerErrorMessages = {
  templateNotFound: (path: string) => `Шаблон ${path} не найден`,
  jobFailed: (id: Bull.JobId, email: string, error: string) =>
    `Задача ${id} отправки email на ${email} провалилась. Ошибка ${error}`,
};
