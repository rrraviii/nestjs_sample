import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// CanActivate -> 사용가능한지 여부
@Injectable()
export class PrivilegesGuard implements CanActivate {
  // 런타임시에 메타 데이터를 가져 올 수 있도록
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('여기서는 ----  select, delete, insert, create 조건 검색 해야함.');

    // request 읽어오기
    const request = context.switchToHttp().getRequest();

    return true;
  }
}
