import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../../placeAnOrderForm/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('recovery_password_code')
export class RecoveryPasswordCode {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Айди пользователя' })
  @Column({ nullable: false })
  userId: number;

  @ApiProperty({ description: 'Код для восстановления пароля', example: '232323' })
  @Column({ length: 6 })
  code: string;

  @ApiProperty({ description: 'Дата и время удаления кода' })
  @Column({ nullable: true })
  deletedAt: Date;

  @ApiProperty({ description: 'Дата и время истечения срока действия кода' })
  @Column({ nullable: true })
  expiresAt: Date;

  @ManyToOne(() => Users, (user) => user.id, { onDelete: 'CASCADE' })
  user: Users;
}
