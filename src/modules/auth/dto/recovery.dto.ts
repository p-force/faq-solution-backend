import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsDateString } from 'class-validator';

export class AuthFormDto {
  expireDate: Date; // дата и время истечения срока действия кода

  @ApiProperty({ description: 'Айди пользователя' })
  @IsNotEmpty({ message: 'The "userId" field must not be empty' })
  readonly userId: string;

  @ApiProperty({ description: 'Код для восстановления пароля', example: '232323' })
  @IsString({ message: 'Code must be a string.' })
  @MaxLength(6, { message: "The 'Code' field must not exceed 6 characters." })
  readonly code: string;

  @ApiProperty({ description: 'Дата и время истечения срока действия кода' })
  @IsNotEmpty({ message: "The 'Date of Birth' field must not be empty." })
  @IsDateString({}, { message: 'Invalid date of birth.' })
  readonly deletedAt: string;
}
