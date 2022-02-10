import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { BrandModule } from './brand/brand.module';
import { CoinModule } from './coin/coin.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BoardsModule,
    CoinModule,
    AuthModule,
    CommonModule,
    BrandModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/social-monitor-prod'),
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}
