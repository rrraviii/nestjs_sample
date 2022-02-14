import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('notis')
export class Notis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  noti: string;

  @ManyToOne((type) => UserEntity, (user) => user.noti)
  user: UserEntity;
}
