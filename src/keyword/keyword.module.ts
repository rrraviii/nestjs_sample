import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandModule } from 'src/brand/brand.module';
import { BrandEntity } from 'src/brand/entity/bran.entity';
import { KeywordMappingBrand } from './entity/keyword-mapping-brand.entity';
import { Keyword } from './entity/keyword.entity';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';
import { KeywordViewController } from './keywordView.controller';

/**
 * Service in Service 할때는
 * import 할때 Module 을 import 하고
 * export 하는 곳에서는 service export 하면 됨
 */
@Module({
  imports: [BrandModule, TypeOrmModule.forFeature([Keyword, KeywordMappingBrand, BrandEntity])],
  controllers: [KeywordController, KeywordViewController],
  providers: [KeywordService],
})
export class KeywordModule {}
