import { Controller, Get, Post, Req } from '@nestjs/common';
import { request, Request } from 'express';
import { User } from 'src/schema/user/user.schema';
import { InsertUserRequestDTO } from './dto/InsertUserRequestDTO';
import { LoginRequestDTO } from './dto/LoginRequestDTO';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

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
    return await this.userSerivce.loginUser(dto);
  }

  @Get('/findAllUser')
  async findAllUser(): Promise<UserEntity[]> {
    return await this.userSerivce.findAllUser();
  }

  @Post('/addUser')
  async addUser(@Req() request: Request): Promise<string> {
    const insertDTO: InsertUserRequestDTO = request.body;
    return this.userSerivce.addUser(insertDTO);
  }

  @Get('/test')
  test(): string {
    return 'test 안되나';
  }
}
