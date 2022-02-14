import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './role.entity';

@Entity('user_privileges')
export class Privileges {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @ManyToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
