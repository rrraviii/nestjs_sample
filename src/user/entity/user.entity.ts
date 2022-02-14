import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CollectKeywords } from './collect.entity';
import { CommunityIssueEntity } from './communityIssue.entity';
import { Notis } from './noti.entity';
import { UserRole } from './role.entity';
import { SnSIssueEntity } from './snsIssue.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  role: number;

  @Column()
  name: string;

  @Column()
  brandId: string;

  @Column()
  email: string;

  @Column({ default: '' })
  phone: string;

  @Column({ type: 'boolean', default: false })
  doesReceiveEmail: boolean;

  @Column({ type: 'boolean', default: false })
  doesReceiveSMS: boolean;

  @OneToMany((type) => SnSIssueEntity, (snsIssueFilter) => snsIssueFilter.userEntity)
  snsIssueFilter: SnSIssueEntity[];

  @OneToMany(() => CommunityIssueEntity, (community) => community.user)
  communityIssueFilter: CommunityIssueEntity[];

  @OneToMany(() => CollectKeywords, (keywords) => keywords.user)
  collectKeywords: CollectKeywords[];

  @OneToMany(() => Notis, (notis) => notis.user)
  noti: Notis[];

  @ManyToMany(() => UserRole, (userRole) => userRole.user)
  @JoinTable()
  userRoles: UserRole[];
}
