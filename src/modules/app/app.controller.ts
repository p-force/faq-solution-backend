import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Application')
@Controller()
export class AppController {
  @Get('')
  getHello(): string {
    return `Version: ${process.env.npm_package_version} `;
  }
}
