import { Body, Controller, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PlaceAnOrderFormService } from './placeAnOrderForm.service';
import { FormStatusMessages } from './dto/placeAnOrderForm.constants';
import { PlaceAnOrderForm } from './entities/placeAnOrderForm.entity';
import { PlaceAnOrderFormDto } from './dto/placeAnOrderForm.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Place An Order Form')
@Controller('place-an-order-form')
export class PlaceAnOrderFormController {
  constructor(private readonly placeAnOrderService: PlaceAnOrderFormService) {}
  @ApiTags('Personal Data Form')
  @ApiOperation({ summary: 'Отправление персональных данных' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: FormStatusMessages.SUCCESS,
    type: () => PlaceAnOrderForm,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${FormStatusMessages.ERROR}\t\n\t\nsome error message`,
  })
  @Post('order')
  async create(@Body() createUserDto: PlaceAnOrderFormDto) {
    return this.placeAnOrderService.createUser(createUserDto);
  }

  @ApiOperation({
    summary: 'Upload passport/ID photo',
    description: 'WARN! Multipart/form-data',
  })
  @ApiOkResponse({
    schema: {
      properties: {
        url: {
          type: 'string',
          example:
            'https://rgo.ru/upload/content_block/images/9ca8302358b777e143cd6e314058266b.jpg',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @Post('/upload')
  putNewFile(@UploadedFile('file') file: Express.Multer.File): { url: string } {
    return this.placeAnOrderService.putNewFile(file);
  }
}
