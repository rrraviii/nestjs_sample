import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../security/role-type';

// runtime 시에 들어가는 SetMetadata
export const Roles = (...roles: RoleType[]): any => SetMetadata('roles', roles);
