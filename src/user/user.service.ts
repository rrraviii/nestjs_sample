import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/schema/user/user.schema';
import { Repository } from 'typeorm';
import { LoginRequestDTO } from './dto/LoginRequestDTO';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(UserEntity)
    private userRdbRepository: Repository<UserEntity>
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

  async addUser(): Promise<string> {
    console.log('addUser 확인중 ---->');
    // const result = await this.userRdbRepository.insert({ id: 2, intra_id: '인트라아이디', nickname: '닉네임' });
    // console.log(result);
    return '유저 추가 테스트';
  }
}
