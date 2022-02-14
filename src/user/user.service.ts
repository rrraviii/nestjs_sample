import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/schema/user/user.schema';
import { Repository } from 'typeorm';
import { InsertUserRequestDTO } from './dto/InsertUserRequestDTO';
import { LoginRequestDTO } from './dto/LoginRequestDTO';
import { UserRole } from './entity/role.entity';
import { Privileges } from './entity/privileges.entity';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(UserEntity)
    private userRdbRepository: Repository<UserEntity>,
    @InjectRepository(UserRole)
    private roleRepository: Repository<UserRole>
  ) {}

  // 유저 전체 조회
  async getAllUser(): Promise<User[]> {
    const list = await this.userRepository.getAllUser();
    console.log('user list 확인중22', list);
    return list;
  }

  async loginUser(req: LoginRequestDTO): Promise<string> {
    const user = await this.userRdbRepository.findOne({ email: req.id, password: req.pwd });
    console.log('user 로그인 --', user);
    //const convertUser = this.flatAuthorities(user);
    //console.log('convertUser', convertUser);
    return 'test';
  }

  // 유저 한명 조회
  async findOne(id: string): Promise<User> {
    try {
      console.log('서비스 id 확인중', id);
      return await this.userRepository.findOne(id);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * 유저 전체 조회
   * @returns
   */
  findAllUser(): Promise<UserEntity[]> {
    console.log('유저 리스트 조회 -0---->');
    const list = this.userRdbRepository.find();
    console.log('list 확인중 rdb--- @@', list);
    return list;
  }
  /**
  private flatAuthorities(user: UserEntity): UserEntity {
    if (user && user.authority.) {
      user.stringAuthorities = [...user.authorities.map((v) => v.authorityName)];
    }

    console.log('최종 return data ', user);

    return user;
  }

  private convertInAuthorities(user: UserEntity): UserEntity {
    if (user && user.authorities) {
      const authorities: any[] = [];
      user.authorities.forEach((authority) => {
        authorities.push({ name: authority.authorityName });
      });
      user.authorities = authorities;
    }
    return user;
  }
   */

  /**
   *  1. 사용자 등록시 userRole 데이터 추가
   *  2. privilege 등록
   *
   *   query: START TRANSACTION
   *   query: INSERT INTO "user"("userId", "password", "role", "name", "brandId", "email", "phone", "doesReceiveEmail", "doesReceiveSMS") VALUES ($1, $2, DEFAULT, $3, $4, $5, DEFAULT, DEFAULT, DEFAULT) RETURNING "id", "role", "phone", "doesReceiveEmail", "doesReceiveSMS" -- PARAMETERS: ["ppap","1004","피피에이피","1","ppap@naver.com"]
   *   query: INSERT INTO "user_user_roles_user_role"("userId", "userRoleId") VALUES ($1, $2) -- PARAMETERS: [13,2]
   *   query: COMMIT
   *   query: SELECT "UserRole"."id" AS "UserRole_id", "UserRole"."role_id" AS "UserRole_role_id", "UserRole"."role_name" AS "UserRole_role_name" FROM "user_role" "UserRole" WHERE "UserRole"."id" IN ($1) -- PARAMETERS: [2]
   *   query: SELECT "UserRole_privileges_rid"."userRoleId" AS "userRoleId", "UserRole_privileges_rid"."userPrivilegesId" AS "userPrivilegesId" FROM "user_privileges" "user_privileges" INNER JOIN "user_role_privileges_user_privileges" "UserRole_privileges_rid" ON ("UserRole_privileges_rid"."userRoleId" = $1 AND "UserRole_privileges_rid"."userPrivilegesId" = "user_privileges"."id") ORDER BY "UserRole_privileges_rid"."userPrivilegesId" ASC, "UserRole_privileges_rid"."userRoleId" ASC -- PARAMETERS: [2]
   *   query: START TRANSACTION
   *   query: INSERT INTO "user_role_privileges_user_privileges"("userRoleId", "userPrivilegesId") VALUES ($1, $2) -- PARAMETERS: [2,1]
   *   query: COMMIT
   * @param insertUserRequestDTO
   * @returns
   */
  async addUser(insertUserRequestDTO: InsertUserRequestDTO): Promise<string> {
    console.log('addUser 확인중 ---->', insertUserRequestDTO);
    let entity = new UserEntity();
    entity = { ...entity, ...insertUserRequestDTO };

    // default 등록시 사용자로 등록됨
    const defaultRole = new UserRole();
    defaultRole.id = 2;
    defaultRole.roleId = 'user';
    defaultRole.roleName = '사용자';
    entity.userRoles = [defaultRole];

    // 매핑 테이블 까지 저장할때는 save 를 사용
    const result = await this.userRdbRepository.save({ ...entity }); //insert({ ...entity });

    const defaultPrivileges = new Privileges();
    defaultPrivileges.id = 1;
    defaultPrivileges.name = 'SELECT';
    defaultRole.privileges = [defaultPrivileges];
    this.roleRepository.save({ ...defaultRole });

    console.log('추가 확인중', result);
    return '유저 추가 테스트';
  }
}
