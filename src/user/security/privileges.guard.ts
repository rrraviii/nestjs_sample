import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

// CanActivate -> 사용가능한지 여부
@Injectable()
export class PrivilegesGuard implements CanActivate {
  // 런타임시에 메타 데이터를 가져 올 수 있도록
  constructor(private readonly reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const privilege = this.reflector.get<string[]>('privilege', context.getHandler());
    console.log('---------- > privilege');
    console.log(privilege);

    // request 읽어오기
    const request = context.switchToHttp().getRequest();
    // cookie 정보 저장
    const token = request.cookies.accessToken;
    const parseToken = this.jwtService.verify(token, { secret: 'PSJ' });
    let checked = false;
    privilege.forEach((v) => {
      parseToken.privileges.forEach((j) => {
        if (v === j.name) {
          checked = true;
          return;
        }
      });
    });

    return checked;
  }
}
