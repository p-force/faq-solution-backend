import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthStatusMessages } from './dto/auth.constants';
import { AuthFormDto } from './dto/users.dto';
import { LoginFormDto } from './dto/login.dto';

@ApiTags('Auth Form')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Registration' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: AuthStatusMessages.REGISTERED_SUCCESSFULLY,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${AuthStatusMessages.ALREADY_EXISTS}\t\n\t\nsome error message`,
  })
  @Post('/registration')
  async registration(@Body() userData: AuthFormDto) {
    return this.authService.registration(userData);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: AuthStatusMessages.AUTHORUZED_SUCCESSFULLY,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${AuthStatusMessages.INVALID}\t\n\t\nsome error message`,
  })
  @Post('/login')
  async login(@Body() loginDto: LoginFormDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Forgot password/ Send recovery code' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: AuthStatusMessages.CREATED,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${AuthStatusMessages.ERROR}\t\n\t\nsome error message`,
  })
  @Post('/recovery-password')
  async recoveryPassword(@Body() email: string) {
    return this.authService.recoveryPassword(email);
  }

  @ApiOperation({ summary: 'Set new password' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: AuthStatusMessages.PASSWORD_UPDATED_SUCCESSFULLY,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${AuthStatusMessages.ERROR_SET_PASSWORD}\t\n\t\nsome error message`,
  })
  @Post('/set-password')
  async setPassword(@Body() data: { code: string; email: string; newPassword: string }) {
    return this.authService.setPassword(data);
  }
}
