import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CallRequest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  nameSurname: string;

  @Column({ type: 'text' })
  phone: string;
}
