import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { BrandEntity } from 'src/brand/entity/bran.entity';
import { CommonDTO } from 'src/common/dto/CommonDTO';
import { KeywordMappingBrand } from '../entity/keyword-mapping-brand.entity';
import { KeywordType } from './keyword-type';

export class ResponseKeywordDTO extends PartialType(CommonDTO) {
  @Expose()
  id: number;
  @Expose()
  keyword: string;
  @Expose()
  crawlingDays: number;
  @Expose()
  crawlingIntervalSec: number;
  @Expose()
  hideServiceBrand: boolean;
  @Expose()
  keywordType: KeywordType;
  @Expose()
  keywordMappingBrandList: KeywordMappingBrand[];
  @Expose()
  brandList: BrandEntity[];
  @Expose()
  isActivate: boolean;
}
