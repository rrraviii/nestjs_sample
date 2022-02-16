import { Controller, Post, Req, Res, UseFilters } from '@nestjs/common';
import { Request, response, Response } from 'express';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { LoginRequestDTO } from 'src/user/dto/LoginRequestDTO';
import { UserEntity } from 'src/user/entity/user.entity';
import { AuthService } from './auth.service';

@UseFilters(HttpExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 로그인한 계정의 role 을 기준으로 작업을 해봐야 할듯.
   *
   * @param request
   * @returns
   */
  @Post('/login')
  async loginUser(@Req() request: Request, @Res() res: Response): Promise<any> {
    const dto: LoginRequestDTO = request.body;
    console.log('what body', dto);
    const jwt = await this.authService.loginUser(dto);
    res.cookie('accessToken', jwt.accessToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return res.json(jwt);
  }
}
