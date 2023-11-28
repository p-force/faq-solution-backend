import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Matches,
  MaxLength,
  ArrayMaxSize,
  IsMimeType,
  ValidationOptions,
} from 'class-validator';

export class PlaceAnOrderFormDto {
  @ApiProperty({ description: 'Имя и Фамилия', example: 'Ivan Ivanov' })
  @IsNotEmpty({ message: 'The "Name and Surname" field must not be empty' })
  @MaxLength(100, { message: "The 'Name and Surname' field must not exceed 100 characters." })
  readonly fullName: string;

  @ApiProperty({ description: 'Email пользователя', example: 'user@mail.ru' })
  @IsNotEmpty({ message: 'Email must not be empty.' })
  @IsString({ message: 'Email must be a string.' })
  @IsEmail({}, { message: 'Invalid email.' })
  readonly email: string;

  @ApiProperty({ description: 'Сервис' })
  @IsString({ message: 'Service must be a string.' })
  @IsNotEmpty({ message: 'Service must not be empty.' })
  readonly service: string;

  @ApiProperty({ description: 'Время доставки', example: '24 hours' })
  @IsString({ message: 'Delivery Time must be a string.' })
  @IsNotEmpty({ message: 'Delivery Time must not be empty.' })
  deliveryTime: string;

  @ApiProperty({ description: 'Cтраницы', example: '4' })
  @IsString({ message: 'Pages must be a string.' })
  @IsNotEmpty({ message: 'Pages must not be empty.' })
  pages: string;

  @ApiProperty({ description: 'Купон', example: 'FQ0000000' })
  @IsString({ message: "The 'Coupon' field must be a string." })
  @IsOptional({ message: "The 'Coupon' field must be empty." })
  @Matches(/^FQ\d{6}$/, { message: "Coupon doesn't exist" }) // Валидация формата купона
  coupon: string;

  @ApiProperty({ description: 'Сообщение' })
  @IsOptional({ message: "The 'Message' field must be empty." })
  @IsString({ message: "The 'Message' field must be a string." })
  @MaxLength(500, { message: "The 'Message' field must not exceed 500 characters." })
  message: string;

  @ApiProperty({ description: 'Writer and Editor Level', example: 'PhD' })
  @IsString({ message: 'Writer and Editor Level must be a string.' })
  @IsNotEmpty({ message: 'Writer and Editor Level must not be empty.' })
  writerAndEditorLevel: string;

  @ApiProperty({
    description: 'Текстовый файл',
    format: 'text/plain',
    type: 'string',
    isArray: true,
  })
  @ArrayMaxSize(1, { message: 'There should not be more than two elements.' })
  @IsMimeType('text/plain' as ValidationOptions)
  readonly uploadFile: string;
}
