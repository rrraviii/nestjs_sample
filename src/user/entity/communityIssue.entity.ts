import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('community_issue')
export class CommunityIssueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  channelKeyname: string;

  @Column()
  commentCount: number;

  @Column()
  likeCount: number;

  @Column()
  shareCount: number;

  @ManyToOne((type) => UserEntity, (user) => user.communityIssueFilter)
  user: UserEntity;
}
