import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsNumber, IsDateString } from 'class-validator';

export class AuthFormDto {
  @ApiProperty({ description: 'ID пользователя' })
  @IsNotEmpty({ message: 'The "userId" field must not be empty' })
  @IsNumber({}, { message: 'The "userId" must be a number.' })
  readonly userId: number;

  @ApiProperty({ description: 'Код для восстановления пароля', example: '232323' })
  @IsString({ message: 'Code must be a string.' })
  @MaxLength(6, { message: "The 'Code' field must not exceed 6 characters." })
  readonly code: string;

  @ApiProperty({ description: 'Дата и время удаления кода', required: false })
  @IsDateString({}, { message: 'Invalid date format for "deletedAt".' })
  readonly deletedAt?: string;

  @ApiProperty({ description: 'Дата и время истечения срока действия кода', required: false })
  @IsDateString({}, { message: 'Invalid date format for "expiresAt".' })
  readonly expiresAt?: string;
}
