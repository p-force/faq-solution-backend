import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh Token пользователя',
    example: 'dGhpc2lzYXJlZnJlc2h0b2tlbi...',
  })
  @IsString({ message: 'The refresh token must be a string.' })
  @IsNotEmpty({ message: 'The refresh token must not be empty.' })
  readonly refreshToken: string;

  @ApiProperty({ description: 'ID пользователя', example: 1 })
  @IsNumber({}, { message: 'The user ID must be a number.' })
  @IsNotEmpty({ message: 'The user ID must not be empty.' })
  readonly userId: number;
}
