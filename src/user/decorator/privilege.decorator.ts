import { SetMetadata } from '@nestjs/common';
import { PrivilegeType } from '../security/privilege-type';

// runtime 시에 들어가는 SetMetadata
export const Privileges = (...privilege: PrivilegeType[]): any => SetMetadata('privilege', privilege);
