import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandMappingCategory } from 'src/brand/entity/category-mapping-brand.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, BrandMappingCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryModule],
})
export class CategoryModule {}
