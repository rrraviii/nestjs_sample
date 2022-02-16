import { Injectable, UnauthorizedException, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { LoginRequestDTO } from 'src/user/dto/LoginRequestDTO';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';

@UseFilters(HttpExceptionFilter)
@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  /**
   * 로그인 버튼 클릭시
   * @param dto
   * @returns
   */
  async loginUser(dto: LoginRequestDTO): Promise<{ accessToken: string } | undefined> {
    const userFind: UserEntity = await this.userService.findByFields({
      where: { userId: dto.id },
    });
    if (!userFind || dto.pwd !== userFind.password) {
      // 인증 안됨
      throw new UnauthorizedException();
    }

    console.log('유저 롤 확인하자', userFind);
    const result = await this.userService.fetchUserInfoAndRoleInfo(userFind.id);
    console.log('유저롤 확인중 -- ', result);

    const privilege = [];
    result.userRoles.forEach((v) => {
      v.privileges.forEach((j) => {
        const pri = {
          id: j.id,
          name: j.name,
        };
        privilege.push(pri);
      });
    });

    const payload: Payload = { id: userFind.id, username: userFind.name, authorities: [...result.userRoles], privileges: [...privilege] };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
