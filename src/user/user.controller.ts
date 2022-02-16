import { Controller, Get, Post, Req, UseFilters } from '@nestjs/common';
import { Request } from 'express';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { AddRolePrivilegeDTO } from './dto/add-rolePrivilege.dto';
import { InsertUserRequestDTO } from './dto/InsertUserRequestDTO';
import { Privileges } from './entity/privileges.entity';
import { UserRole } from './entity/role.entity';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

@UseFilters(HttpExceptionFilter)
@Controller('user')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  /**
  @Get()
  async getAllUser(): Promise<User[]> {
    console.log('user getAll 호출 되었나?');
    return await this.userSerivce.getAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userSerivce.findOne(id);
  }
   */

  @Get('/findAllUser')
  async findAllUser(): Promise<UserEntity[]> {
    return await this.userSerivce.findAllUser();
  }

  @Post('/addUser')
  async addUser(@Req() request: Request): Promise<string> {
    const insertDTO: InsertUserRequestDTO = request.body;
    return this.userSerivce.addUser(insertDTO);
  }

  /**
   * 권한 조회
   * @returns
   */
  @Get('/fetchUserRoleList')
  async fetchUserRoleList(): Promise<UserRole[]> {
    return await this.userSerivce.fetchUserRoleList();
  }

  /**
   * 역할 전체 조회
   * @param request
   * @returns
   */
  @Get('/fetchPrivilegesList')
  async fetchPrivilegesList(): Promise<Privileges[]> {
    return await this.userSerivce.fetchPrivilegesList();
  }

  /**
   * 역할에 대한 권한 조회
   *
   * @param roleId : number
   * @returns
   */
  @Post('/fetchPrivileges')
  async fetchPrivileges(@Req() request: Request): Promise<UserRole[]> {
    console.log('파라미터 확인 : ', request.body);
    const { roleId } = request.body;
    const userRole = new UserRole();
    userRole.id = roleId;
    return await this.userSerivce.fetchPrivileges(userRole);
  }

  /**
   * Role 에 역할 추가 메서드
   *  - 추가할 role
   *  - privilege
   * @param request
   * @returns
   */
  @Post('/addPrivilege')
  async addPrivilege(@Req() request: Request): Promise<string> {
    const param: AddRolePrivilegeDTO = request.body;
    return await this.userSerivce.addPrivilege(param);
  }

  @Get('/test')
  test(): string {
    return 'test 안되나';
  }
}
