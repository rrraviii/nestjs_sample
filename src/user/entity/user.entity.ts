import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { CollectKeywords } from './collect.entity';
import { CommunityIssueEntity } from './communityIssue.entity';
import { Notis } from './noti.entity';
import { UserRole } from './role.entity';
import { SnSIssueEntity } from './snsIssue.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('varchar', {
    length: 20,
  })
  _id: string;

  @Column()
  password: string;

  @Column()
  role: number;

  @Column()
  name: string;

  @Column()
  brandId: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  doesReceiveEmail: boolean;

  @Column()
  doesReceiveSMS: boolean;

  @OneToMany(() => SnSIssueEntity, (sns) => sns.user)
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

  stringAuthorities: string[];
}
