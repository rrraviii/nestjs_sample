import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { CoinModule } from './coin/coin.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from './brand/brand.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
