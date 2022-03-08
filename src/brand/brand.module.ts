import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { Category } from 'src/category/entity/category.entity';
import { KeywordMappingBrand } from 'src/keyword/entity/keyword-mapping-brand.entity';
import { Keyword } from 'src/keyword/entity/keyword.entity';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandViewController } from './brandView.controller';
import { BrandEntity } from './entity/bran.entity';
// import { BrandMappingCategory } from './entity/category-mapping-brand.entity';

//MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
@Module({
  imports: [
    TypeOrmModule.forFeature([BrandEntity, Category, KeywordMappingBrand, Keyword]),
    JwtModule.register({ secret: 'PSJ', signOptions: { expiresIn: '300s' } }),
    CategoryModule,
  ],
  controllers: [BrandController, BrandViewController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
