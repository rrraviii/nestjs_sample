import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/schema/user/user.schema';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';

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

  async addUser(): Promise<string> {
    console.log('addUser 확인중 ---->');
    const result = await this.userRdbRepository.insert({ id: 2, intra_id: '인트라아이디', nickname: '닉네임' });
    // console.log(result);
    return '유저 추가 테스트';
  }
}
