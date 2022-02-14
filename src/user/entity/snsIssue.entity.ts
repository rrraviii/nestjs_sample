import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('sns_issue')
export class SnSIssueEntity {
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

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.snsIssueFilter)
  userEntity: UserEntity;
}
