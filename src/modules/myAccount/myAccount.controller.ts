import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyAccountService } from './myAccount.service';
import { AccountStatusMessages } from './myAccount.constants';

@ApiTags('My Account')
@Controller('account')
export class MyAccountController {
  constructor(private readonly accountService: MyAccountService) {}
  @ApiOperation({ summary: 'Orders History' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: AccountStatusMessages.OK,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${AccountStatusMessages.ERROR}\t\n\t\nsome error message`,
  })
  @Post('/orders-history')
  async getOrders(@Body() email: string) {
    return this.accountService.getOrders(email);
  }

  @ApiOperation({ summary: 'Personal Details' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: AccountStatusMessages.OK,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${AccountStatusMessages.ERROR}\t\n\t\nsome error message`,
  })
  @Post('/personal-details')
  async getPersonalDetails(@Body() email: string) {
    return this.accountService.getPersonalDetails(email);
  }

  @ApiOperation({ summary: 'Change Personal Details' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: AccountStatusMessages.OK,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${AccountStatusMessages.ERROR}\t\n\t\nsome error message`,
  })
  @Post('/personal-details')
  async changePersonalDetails(
    @Body() oldEmail: string,
    data: { email: string; phone: string; fullName: string },
  ) {
    return this.accountService.changePersonalDetails(oldEmail, data);
  }
}
