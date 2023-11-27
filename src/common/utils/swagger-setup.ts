import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfigType } from '../config/swagger.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';

export function swaggerSetup(app: INestApplication) {
  const configService = app.get(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfigType>('swagger');

  if (!swaggerConfig.enable) return;

  if (swaggerConfig.enableAuth) {
    app.use(
      swaggerConfig.path,
      basicAuth({
        challenge: true,
        users: swaggerConfig.user,
      }),
    );
  }

  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerConfig.path, app, document, {
    swaggerOptions: {
      tagSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}
