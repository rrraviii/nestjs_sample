import { PrivilegesDTO } from './privilege.dto';
import { UserRoleDTO } from './role-dto';

export class AddRolePrivilegeDTO {
  role: UserRoleDTO;
  privileges: PrivilegesDTO[];
}
