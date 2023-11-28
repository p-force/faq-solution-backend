import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ContactForm {
  @ApiProperty({ description: 'Уникальный идентификатор пользователя', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Имя и фамилия пользователя', example: 'Ivan Ivanov' })
  @Column({ length: 100, nullable: false })
  fullName: string;

  @ApiProperty({ description: 'Email пользователя', example: 'user@mail.ru' })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({ description: 'Мобильный номер пользователя', example: '+7 0123456789' })
  @Column({ nullable: false })
  phone: string;

  @ApiProperty({ description: 'Тип проблемы' })
  @Column({ nullable: false })
  topic: string;

  @ApiProperty({ description: 'Сообщение', example: 'Ваше сообщение здесь' })
  @Column({ nullable: true, length: 500 })
  message: string;
}
