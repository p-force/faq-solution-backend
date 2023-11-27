import { HttpException } from '@nestjs/common';
import { errorsEnum } from '../enum/errors.enum';

export const makeError = (code: errorsEnum, additional: Record<string, unknown> = {}) => {
  const status = code;

  return new HttpException(
    {
      statusCode: status,
      ...additional,
    },
    status,
  );
};
