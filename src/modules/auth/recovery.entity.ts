import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../placeAnOrderForm/entities/user.entity';

@Entity('recovery_password_code')
export class RecoveryPasswordCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  code: string;

  @Column()
  deletedAt: Date;

  @ManyToOne(() => Users, (user) => user.id, { onDelete: 'CASCADE' })
  user: Users;
}
