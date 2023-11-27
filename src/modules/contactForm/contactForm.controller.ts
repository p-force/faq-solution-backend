import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { ContactFormService } from './contactForm.service';
import { ContactStatusMessages } from './dto/contactForm.constant';
import { ContactFormDto } from './dto/contactForm.dto';
import { RequestCallDTO } from './dto/callRecuest.dto';

@ApiTags('Contacts Form')
@Controller('contact')
export class ContactFormController {
  constructor(private readonly contactService: ContactFormService) {}

  @ApiOperation({ summary: 'Отправление "Merchant issues"' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: ContactStatusMessages.CREATE_REQUEST_SUCCESS,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${ContactStatusMessages.ERROR}\t\n\t\nsome error message`,
  })
  @Post('/merchant')
  async createMerchant(@Body() contactServiceDto: ContactFormDto) {
    return this.contactService.create(contactServiceDto);
  }

  @ApiOperation({ summary: 'Отправление  "Request a call"' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: ContactStatusMessages.CREATE_REQUEST_SUCCESS,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${ContactStatusMessages.ERROR}\t\n\t\nsome error message`,
  })
  @Post('/call-request')
  async createCallRequest(@Body() createCallReq: RequestCallDTO) {
    return this.contactService.createCallRequest(createCallReq);
  }
}
