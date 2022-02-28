import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { BrandModule } from './brand/brand.module';
import { CoinModule } from './coin/coin.module';
import { CommonModule } from './common/common.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    BoardsModule,
    CoinModule,
    CommonModule,
    BrandModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/social-monitor-prod'),
    TypeOrmModule.forRoot(),
    AuthModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
