import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PlaceAnOrderForm {
  @ApiProperty({ description: 'Уникальный идентификатор пользователя', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Имя и фамилия пользователя', example: 'Ivan Ivanov' })
  @Column({ length: 100, nullable: false })
  fullName: string;

  @ApiProperty({ description: 'Email пользователя', example: 'user@mail.ru' })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({ description: 'Выбор услуги' })
  @Column({ nullable: false })
  service: string;

  @ApiProperty({ description: 'Время доставки' })
  @Column({ nullable: false })
  deliveryTime: string;

  @ApiProperty({ description: 'Количество страниц', example: '5' })
  @Column({ nullable: false })
  pages: string;

  @ApiProperty({ description: 'Купон', example: 'FQ000000' })
  @Column({ nullable: true })
  coupon: string;

  @ApiProperty({ description: 'Уровень писателя и редактора' })
  @Column({ nullable: false })
  writerAndEditorLevel: string;

  @ApiProperty({ description: 'Загрузка файла', example: 'file.doc' })
  @Column({ nullable: true })
  uploadFile: string;

  @ApiProperty({ description: 'Сообщение' })
  @Column({ nullable: true, length: 500 })
  message: string;
}
