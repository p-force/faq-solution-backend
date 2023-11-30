import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class LogoutDto {
  @ApiProperty({
    description: 'Access Token пользователя',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString({ message: 'The access token must be a string.' })
  @IsNotEmpty({ message: 'The access token must not be empty.' })
  readonly accessToken: string;

  @ApiProperty({
    description: 'Refresh Token пользователя',
    example: 'dGhpc2lzYXJlZnJlc2h0b2tlbi...',
    required: false,
  })
  @IsString({ message: 'The refresh token must be a string.' })
  @IsOptional()
  readonly refreshToken?: string;

  @ApiProperty({ description: 'ID пользователя', example: 1 })
  @IsNumber({}, { message: 'The user ID must be a number.' })
  @IsNotEmpty({ message: 'The user ID must not be empty.' })
  readonly userId: number;
}
