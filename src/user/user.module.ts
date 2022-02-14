import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { SnSIssueEntity } from 'src/channel/entity/snsIssue.entity';
import { User, UserSchema } from 'src/schema/user/user.schema';
import { CollectKeywords } from './entity/collect.entity';
import { CommunityIssueEntity } from './entity/communityIssue.entity';
import { Privileges } from './entity/privileges.entity';
import { UserRole } from './entity/role.entity';
import { SnSIssueEntity } from './entity/snsIssue.entity';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserViewController } from './userView.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forFeature([UserEntity, SnSIssueEntity, CommunityIssueEntity, CollectKeywords, UserRole, Privileges]),
  ],
  controllers: [UserController, UserViewController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
