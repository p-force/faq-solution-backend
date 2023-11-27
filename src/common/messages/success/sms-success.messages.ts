import Bull from 'bull';

export const SmsSuccessMessages = {
  smsTrySend: (phone: string) => `Попытка отправить SMS на номер ${phone}`,
  smsJobAdd: (id: Bull.JobId, phone: string) =>
    `Добавлена задача ${id} отправки SMS на номер ${phone}`,
  smsSendSuccess: (phone: string) => `SMS на номер ${phone} успешно передана в сервис отправки SMS`,
  jobInProgress: (id: Bull.JobId, phone: string) =>
    `Обрабатывается задача ${id} отправки sms сообщения на ${phone}`,
  smsVerifyMessage: (code: string) =>
    `Подтверждение номера телефона на портале Калининград Мелиорация. Ваш код: ${code}`,
};
