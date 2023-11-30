import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../../placeAnOrderForm/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('recovery_password_code')
export class UserTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Айди пользователя' })
  @Column({ nullable: false })
  userId: number;

  @ApiProperty({ description: 'refreshToken' })
  @Column({ nullable: false })
  refreshToken: string;

  @ApiProperty({ description: 'Дата и время удаления токена' })
  @Column({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Users, (user) => user.id, { onDelete: 'CASCADE' })
  user: Users;
}
