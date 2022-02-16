import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { AddRolePrivilegeDTO } from './dto/add-rolePrivilege.dto';
import { InsertUserRequestDTO } from './dto/InsertUserRequestDTO';
import { LoginRequestDTO } from './dto/LoginRequestDTO';
import { UserInfoDTO } from './dto/UserInfoDTO';
import { Privileges } from './entity/privileges.entity';
import { UserRole } from './entity/role.entity';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    // private readonly userRepository: UserRepository,
    @InjectRepository(UserEntity)
    private userRdbRepository: Repository<UserEntity>,
    @InjectRepository(UserRole)
    private roleRepository: Repository<UserRole>,
    @InjectRepository(Privileges)
    private privilegesRepository: Repository<Privileges>
  ) {}

  /**
  async getAllUser(): Promise<User[]> {
    const list = await this.userRepository.getAllUser();
    console.log('user list 확인중22', list);
    return list;
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
   */

  // id 기준 한명 조회
  async findById(id: number): Promise<UserEntity> {
    return await this.userRdbRepository.findOne({ id });
  }

  async findByFields(options: FindOneOptions<UserEntity>): Promise<UserEntity | undefined> {
    return await this.userRdbRepository.findOne(options);
  }

  /**
   * 유저 전체 조회
   * @returns
   */
  async findAllUser(): Promise<UserEntity[]> {
    console.log('유저 리스트 조회 -0---->');
    const list = await this.userRdbRepository.find();
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
    let findUser = new UserEntity();
    findUser = { ...findUser, ...insertUserRequestDTO };
    let entity = new UserEntity();
    entity = { ...entity, ...insertUserRequestDTO };

    // role 조회
    const selectUserRole = await this.roleRepository
      .createQueryBuilder()
      .whereInIds(insertUserRequestDTO.roleId.map((v) => v))
      .getMany();
    entity.userRoles = [...selectUserRole];

    console.log('role 확인중 ', selectUserRole);

    const findUserInfo = await this.userRdbRepository.findOne({ userId: entity.userId });
    console.log('등록된 정보가 있는지 검사하는 로직 ---@@@', findUserInfo);
    if (typeof findUserInfo !== 'undefined') {
      return '이미 등록된 유저입니다.';
    }
    // 매핑 테이블 까지 저장할때는 save 를 사용 (user, role), 한테이블만 등록시 insert
    const result = await this.userRdbRepository.save({ ...entity }); //insert({ ...entity });
    if (result.id > 0) {
      return 'SUCCESS';
    }
    return 'FAIL';
  }

  /**
   * 로그인시 사용되는 메서드.
   * @param userId
   * @returns
   */
  async fetchUserInfoAndRoleInfo(userId: number): Promise<UserEntity> {
    const userInfo = await this.userRdbRepository.findOne({
      relations: ['userRoles'],
      where: { id: userId },
    });
    // TODO - role 을 여러개 갖을 수 있음.
    const rolePrivilegeInfo = await this.fetchPrivileges(userInfo.userRoles[0]);
    userInfo.userRoles[0] = { ...rolePrivilegeInfo[0] };
    return userInfo;
  }

  /**
   * 사용자 등록시 role 전체 조회
   */
  async fetchUserRoleList(): Promise<UserRole[]> {
    return this.roleRepository.find();
  }

  /**
   * 역할 전체 조회
   */
  async fetchPrivilegesList(): Promise<Privileges[]> {
    return this.privilegesRepository.find();
  }

  /**
   * 역할에 대한 권한 조회
   *
   * @param roleId : number
   * @returns
   */
  async fetchPrivileges(userRole: UserRole): Promise<UserRole[]> {
    const roleInfo = await this.roleRepository.find({
      relations: ['privileges'],
      where: { id: userRole.id },
    });
    return roleInfo;
  }

  /**
   * Role 에 역할 추가 메서드
   *  - 추가할 role
   *  - privilege
   * @param request
   * @returns
   */
  async addPrivilege(param: AddRolePrivilegeDTO): Promise<string> {
    const dbRoleInfo = await this.roleRepository.find({
      relations: ['privileges'],
      where: { id: param.role.id },
    });
    console.log('처음 롤 확인 ---', dbRoleInfo);
    let privileges = [...dbRoleInfo[0].privileges];
    param.privileges.forEach((v) => {
      const tmp = new Privileges();
      tmp.id = v.id;
      tmp.name = v.name;
      privileges = [...privileges, tmp];
    });
    dbRoleInfo[0].privileges = [...privileges];
    const result = await this.roleRepository.save(dbRoleInfo);
    if (result.length > 0) {
      return JSON.stringify({ result: 'success' });
    }
    return JSON.stringify({ result: 'fail' });
  }

  /**
   * 로그인전 유저 유효성 검사
   * @param dto
   */
  async validateUser(dto: LoginRequestDTO): Promise<string> {
    return 'test';
  }
}
