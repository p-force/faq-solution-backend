import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class LogoutDto {
  @ApiProperty({
    description: 'Refresh Token пользователя',
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
