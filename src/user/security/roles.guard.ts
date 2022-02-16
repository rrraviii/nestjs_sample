import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserEntity } from '../entity/user.entity';

// CanActivate -> 사용가능한지 여부
@Injectable()
export class RolesGuard implements CanActivate {
  // 런타임시에 메타 데이터를 가져 올 수 있도록
  constructor(private readonly reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('1.roles 확인중');
    console.log(roles);
    if (!roles) {
      console.log('따로 권한 체크하는게 없는 경우');
      return true;
    }

    // request 읽어오기
    const request = context.switchToHttp().getRequest();

    // cookie 정보 저장
    const token = request.cookies.accessToken;
    const parseToken = this.jwtService.verify(token, { secret: 'PSJ' });
    let checked = false;
    if (parseToken.authorities[0].privileges.length > 0) {
      roles.forEach((v) => {
        if (parseToken.authorities[0].roleId === v) {
          checked = true;
          return;
        }
      });
    }
    console.log('checked -> ', checked);
    return checked;
  }
}
