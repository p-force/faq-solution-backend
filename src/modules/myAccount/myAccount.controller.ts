import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyAccountService } from './myAccount.service';
import { AccountStatusMessages } from './myAccount.constants';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('My Account')
@Controller('account')
export class MyAccountController {
  constructor(private readonly accountService: MyAccountService) {}
  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Personal Details' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: AccountStatusMessages.OK,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${AccountStatusMessages.ERROR}\t\n\t\nsome error message`,
  })
  @Post('/get-personal-details')
  async getPersonalDetails(@Body() email: string) {
    return this.accountService.getPersonalDetails(email);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Change Personal Details' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: AccountStatusMessages.OK,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${AccountStatusMessages.ERROR}\t\n\t\nsome error message`,
  })
  @Post('/change-personal-details')
  async changePersonalDetails(
    @Body() oldEmail: string,
    data: { email: string; phone: string; fullName: string },
  ) {
    return this.accountService.changePersonalDetails(oldEmail, data);
  }
}
