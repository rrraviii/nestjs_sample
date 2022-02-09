import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/schema/user/user.schema';
import { UserEntity } from '../entity/user.entity';

// CanActivate -> 사용가능한지 여부
@Injectable()
export class RolesGuard implements CanActivate {
  // 런타임시에 메타 데이터를 가져 올 수 있도록
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    console.log('심오하다 ---', roles);

    if (!roles) {
      return true;
    }

    // request 읽어오기
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserEntity;

    return true;
    // return user && user.authRole.map((v) => v.authority.some((role) => roles.includes(role.authorityName)));
  }
}
