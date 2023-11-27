import { ConfigType, registerAs } from '@nestjs/config';

const user = {};
user[process.env.SWAGGER_USER] = process.env.SWAGGER_PASS;

export const swaggerConfig = registerAs('swagger', () => ({
  enable: process.env.SWAGGER_ENABLE.toUpperCase() === 'TRUE',
  path: process.env.SWAGGER_PATH,
  enableAuth: process.env.SWAGGER_AUTH.toUpperCase() === 'TRUE',
  user,
  title: process.env.SWAGGER_TITLE,
  description: process.env.SWAGGER_DESCRIPTION,
  version: process.env.SWAGGER_VERSION,
}));

export type SwaggerConfigType = ConfigType<typeof swaggerConfig>;
