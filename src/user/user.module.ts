import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CollectKeywords } from './entity/collect.entity';
import { CommunityIssueEntity } from './entity/communityIssue.entity';
import { Privileges } from './entity/privileges.entity';
import { UserRole } from './entity/role.entity';
import { SnSIssueEntity } from './entity/snsIssue.entity';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserViewController } from './userView.controller';

// MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, SnSIssueEntity, CommunityIssueEntity, CollectKeywords, UserRole, Privileges]),
  ],
  controllers: [UserController, UserViewController],
  providers: [UserService, JwtStrategy],
  exports: [UserService, UserModule],
})
export class UserModule {}
