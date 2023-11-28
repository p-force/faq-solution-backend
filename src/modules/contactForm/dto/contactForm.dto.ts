import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MaxLength, IsPhoneNumber } from 'class-validator';

export class ContactFormDto {
  @ApiProperty({ description: 'Имя и Фамилия', example: 'Ivan Ivanov' })
  @IsNotEmpty({ message: 'The "Name and Surname" field must not be empty' })
  @MaxLength(100, { message: "The 'Name and Surname' field must not exceed 100 characters." })
  readonly fullName: string;

  @ApiProperty({ description: 'Email пользователя', example: 'user@mail.ru' })
  @IsString({ message: 'Email must be a string.' })
  @IsEmail({}, { message: 'Invalid email.' })
  readonly email: string;

  @ApiProperty({ description: 'Номер телефона', example: '+7 0123456789' })
  @IsNotEmpty({ message: "The 'Phone Number' field must not be empty." })
  @IsPhoneNumber('RU', { message: 'The phone number must be valid.' })
  @MaxLength(50, { message: "The 'Phone Number' field must not exceed 50 characters." })
  readonly phone: string;

  @ApiProperty({ description: 'Тип проблемы' })
  @IsNotEmpty({ message: "Select 'Topic'" })
  readonly topic: string;

  @ApiProperty({ description: 'Сообщение' })
  @IsString({ message: "The 'Message' field must be a string." })
  @MaxLength(500, { message: "The 'Message' field must not exceed 500 characters." })
  readonly message: string;
}
