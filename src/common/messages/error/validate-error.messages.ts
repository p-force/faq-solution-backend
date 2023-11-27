import { uniqueMessage } from '../../utils/unique-message';

export const validateErrorMessage = {
  valueIsNotEmail: (fieldName: string) =>
    uniqueMessage(fieldName, `Поле должно быть email, например: username@domain.zone`),

  valueIsNotBoolean: (fieldName: string) =>
    uniqueMessage(fieldName, 'Поле должно быть либо true, либо false'),

  valueIsNotPositiveNumber: (fieldName: string) =>
    uniqueMessage(fieldName, 'Поле должно быть числом больше нуля'),

  valueIsNotPhone: (fieldName: string) =>
    uniqueMessage(
      fieldName,
      `Поле должно быть номером телефона, например: 7(999)123-45-67 или 79991234567`,
    ),

  valueIsNotString: (fieldName: string) => uniqueMessage(fieldName, `Поле должно быть строкой`),

  valueIsNotDate: (fieldName: string) =>
    uniqueMessage(fieldName, `Поле должно быть датой, например 01/12/2021`),

  valueIsNotEnum: (fieldName: string, enumValues: unknown[]) =>
    uniqueMessage(fieldName, `Поле должно иметь значения: ${enumValues.slice()}`),

  valueIsBadPassword: (fieldName: string) =>
    uniqueMessage(
      fieldName,
      `Поле должен содержать от 8 до 40 символов, не менее 1 цифры и 1 прописной буквы`,
    ),
  valueIsBadPage: (fieldName: string) =>
    uniqueMessage(fieldName, `Поле должно быть положительным не нулевым числом`),

  valueIsBadLimit: (fieldName: string, maxLimit: number) =>
    uniqueMessage(fieldName, `Поле должно быть числом в диапазоне от 1 до ${maxLimit}`),

  ValueIsNotNumber: (fieldName: string) => uniqueMessage(fieldName, `Поле должно быть числом`),

  fileIsBig: (fieldName: string) => uniqueMessage(fieldName, `Загружаемый файл очень большой`),

  fieldIsRequired: (fieldName: string) =>
    uniqueMessage(fieldName, `Поле обязательно для заполнения.`),

  oldPasswordIsInvalid: (fieldName: string) =>
    uniqueMessage(fieldName, `Поле не совпадает с текущим паролем.`),

  badUserFilterField: <T>(fieldName: string, userFilterField: T) =>
    uniqueMessage(fieldName, `Неверное поле фильтра, поле должно быть ${typeof userFilterField}`),
};
