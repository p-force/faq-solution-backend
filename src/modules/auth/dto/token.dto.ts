import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class Token {
  @ApiProperty({
    description: 'Refresh Token пользователя',
  })
  @IsString({ message: 'The Refresh token must be a string.' })
  @IsNotEmpty({ message: 'The Refresh token must not be empty.' })
  readonly accessToken: string;

  @ApiProperty({
    description: 'Access Token пользователя',
  })
  @IsString({ message: 'The Access token must be a string.' })
  @IsNotEmpty({ message: 'The Access token must not be empty.' })
  readonly refreshToken: string;
}
