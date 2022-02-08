import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { User } from 'src/schema/user/user.schema';
import { UserService } from './user.service';
import { Request } from 'express';
import { LoginRequestDTO } from './dto/LoginRequestDTO';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    console.log('user getAll 호출 되었나?');
    return await this.userSerivce.getAllUser();
  }

  /**
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userSerivce.findOne(id);
  }
   */

  /**
   * 로그인한 계정의 role 을 기준으로 작업을 해봐야 할듯.
   *
   * @param request
   * @returns
   */
  @Post('/login')
  async loginUser(@Req() request: Request): Promise<string> {
    const dto: LoginRequestDTO = request.body;
    console.log('what body', dto);
    return ' Hello ';
    //return await this.userSerivce.loginUser(request);
  }

  @Get('/findAllUser')
  async findAllUser(): Promise<UserEntity[]> {
    return await this.userSerivce.findAllUser();
  }

  @Get('/addUser')
  async addUser(): Promise<string> {
    return this.userSerivce.addUser();
  }

  @Get('/test')
  test(): string {
    return 'test 안되나';
  }
}
