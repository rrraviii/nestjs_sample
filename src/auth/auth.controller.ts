import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDTO } from './model/SignInRequestDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() req: SignInRequestDTO): Promise<string> {
    console.log('로그인 정보 : ', req);

    if ('admin' === req.id) {
      console.log('관리자 이시군요');
    } else {
      console.log('관리자가 아닙니다.');
    }
    return 'Login !';
  }
}
