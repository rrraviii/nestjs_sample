import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('collect_keywords')
export class CollectKeywords {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyword: string;

  @ManyToOne((type) => UserEntity, (user) => user.communityIssueFilter)
  user: UserEntity;
}
