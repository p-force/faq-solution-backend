import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlaceAnOrderFormService } from './placeAnOrderForm.service';
import { FormStatusMessages } from './dto/placeAnOrderForm.constants';
import { PlaceAnOrderForm } from './entities/placeAnOrderForm.entity';
import { PlaceAnOrderFormDto } from './dto/placeAnOrderForm.dto';

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
  @Post()
  async create(@Body() createUserDto: PlaceAnOrderFormDto) {
    return this.placeAnOrderService.createUser(createUserDto);
  }
}
