import Bull from 'bull';

export const smsErrorMessages = {
  noSMSServiceResponse: 'Нет ответа по http от сервиса отправки SMS',
  noSMSTokenProvided:
    'Модуль подключен, но в настройках не указано токен для авторизации в сервисе SMS рассылок',
  jobFailed: (id: Bull.JobId, phone: string, error: string) =>
    `Задача ${id} отправки sms сообщения на ${phone} провалилась. Ошибка: ${error}`,
  maxVerifyAttemptsReached:
    'Вы исчерпали все попытки подтвердить свой номер телефона. Обратитесь к администратору',
  minDelayNotElapsed: 'Прошло недостаточно времени для повторной отправки сообщения',
  phoneNotFound: 'Номер телефона не зарегистрирован в системе',
  verificationNotFound: 'Отсутствуют запросы подтверждения для этого номера телефона',
};
