import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { Category } from 'src/category/entity/category.entity';
import { Brand, BrandSchema } from 'src/schema/brand/brand.schema';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandViewController } from './brandView.controller';
import { BrandEntity } from './entity/bran.entity';
import { BrandKeywords } from './entity/brandKeywords.entity';
import { BrandMappingCategory } from './entity/category-mapping-brand.entity';
import { CompetitionKeywords } from './entity/competition.entity';
import { TrendKeywords } from './entity/trend.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    TypeOrmModule.forFeature([BrandEntity, TrendKeywords, CompetitionKeywords, BrandKeywords, Category, BrandMappingCategory]),
    JwtModule.register({ secret: 'PSJ', signOptions: { expiresIn: '300s' } }),
    CategoryModule,
  ],
  controllers: [BrandController, BrandViewController],
  providers: [BrandService],
})
export class BrandModule {}
