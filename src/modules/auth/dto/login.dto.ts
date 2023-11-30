import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, IsStrongPassword } from 'class-validator';

export class LoginFormDto {
  @ApiProperty({ description: 'Email пользователя', example: 'user@mail.ru' })
  @IsString({ message: 'Email must be a string.' })
  @IsEmail({}, { message: 'Invalid email.' })
  readonly email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'Pwd12345' })
  @IsString({ message: 'The password must be a string.' })
  @IsStrongPassword({}, { message: 'The password is too simple.' })
  @MaxLength(8, { message: "The 'Password' field must not exceed 8 characters." })
  readonly password: string;
}
