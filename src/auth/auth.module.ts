import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectKeywords } from 'src/user/entity/collect.entity';
import { CommunityIssueEntity } from 'src/user/entity/communityIssue.entity';
import { Privileges } from 'src/user/entity/privileges.entity';
import { UserRole } from 'src/user/entity/role.entity';
import { SnSIssueEntity } from 'src/user/entity/snsIssue.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthViewController } from './authView.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SnSIssueEntity, CommunityIssueEntity, CollectKeywords, UserRole, Privileges]),
    JwtModule.register({ secret: 'PSJ', signOptions: { expiresIn: '300s' } }),
  ],
  controllers: [AuthController, AuthViewController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
