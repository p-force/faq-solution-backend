import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthStatusMessages } from './dto/auth.constants';
import { AuthFormDto } from './dto/users.dto';
import { LoginFormDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh.dto';
import { LogoutDto } from './dto/logout.dto';

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
    status: HttpStatus.OK,
    description: AuthStatusMessages.AUTHORIZED_SUCCESSFULLY,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${AuthStatusMessages.NOT_FOUND}\t\n\t\nNo Account Found with this Email`,
  })
  @Post('/login')
  async login(@Body() loginDto: LoginFormDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Refresh Token' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Access token successfully refreshed.',
  })
  @ApiBadRequestResponse({
    description: 'The request failed. Possible reasons:',
    content: {
      'application/json': {
        examples: {
          userTokenNotFound: {
            summary: 'User token not found',
            value: { status: HttpStatus.BAD_REQUEST, error: AuthStatusMessages.NOT_FOUND },
          },
          incorrectRefreshToken: {
            summary: 'Incorrect refresh token provided',
            value: { status: HttpStatus.BAD_REQUEST, error: AuthStatusMessages.INCORRECT_CODE },
          },
          expiredRefreshToken: {
            summary: 'Refresh token expired',
            value: { status: HttpStatus.BAD_REQUEST, error: AuthStatusMessages.EXPIRED_TOKEN },
          },
        },
      },
    },
  })
  @Post('/refresh-token')
  async refreshToken(@Body() tokenDto: RefreshTokenDto) {
    try {
      const newAccessToken = await this.authService.refreshToken(tokenDto);

      return { access_token: newAccessToken };
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({})
  @ApiBadRequestResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `${AuthStatusMessages.NOT_FOUND}\t\n\t\nNo account with this email`,
  })
  @Post('/logout')
  async logout(@Body() logoutDto: LogoutDto): Promise<any> {
    try {
      return await this.authService.logout(logoutDto);
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Forgot password/ Send recovery code' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: AuthStatusMessages.CREATED,
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `${AuthStatusMessages.NOT_FOUND}\t\n\t\nNo account with this email`,
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
    description: 'The request failed. Possible reasons:',
    content: {
      'application/json': {
        examples: {
          userNotFound: {
            summary: 'No account with this email',
            value: { status: HttpStatus.BAD_REQUEST, error: AuthStatusMessages.NOT_FOUND },
          },
          errorSetPassword: {
            summary: 'Code not exists',
            value: { status: HttpStatus.BAD_REQUEST, error: AuthStatusMessages.CODE_NOT_FOUND },
          },
          expiredCode: {
            summary: 'The recovery code is saved',
            value: { status: HttpStatus.BAD_REQUEST, error: AuthStatusMessages.EXPIRED_CODE },
          },
          incorrectCode: {
            summary: 'Incorrect code',
            value: { status: HttpStatus.BAD_REQUEST, error: AuthStatusMessages.INCORRECT_CODE },
          },
          comparedPassword: {
            summary: 'New password is the same as old password',
            value: { status: HttpStatus.BAD_REQUEST, error: AuthStatusMessages.ERROR_SET_PASSWORD },
          },
        },
      },
    },
  })
  @Post('/set-password')
  async setPassword(@Body() data: { code: string; email: string; newPassword: string }) {
    return this.authService.setPassword(data);
  }
}
