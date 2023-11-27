export const userErrorMessages = {
  deletedIsFinalStatus: 'Удален - окончательный статус и не может быть изменен',
  userNotFound: (userId: number) => `Пользователь с id: ${userId} не найден`,
  userWithTelegramTokenNotFound: (token: string) => `Пользователь с токеном: ${token} не найден`,
  userWithPhoneNotFound: (phone: string) => `Пользователь с телефоном: ${phone} не найден`,
  updateNullObject: 'Нет данных для обновления',
};
