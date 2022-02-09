import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Privileges } from './privileges.entity';
import { UserEntity } from './user.entity';

@Entity('user_role')
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'role_id' })
  roleId: string;

  @Column('varchar', { name: 'role_name' })
  roleName: string;

  @ManyToMany(() => UserEntity, (user) => user.userRoles)
  user: UserEntity[];

  @ManyToMany(() => Privileges, (privileages) => privileages.userRoles)
  @JoinTable()
  privileges: Privileges[];
}
