import { Expose } from 'class-transformer';

// @Expose({name : '컬럼명'})
export class KeyWordParseMappingBrand {
  @Expose()
  id: number;
  @Expose()
  brandId: number;
  @Expose()
  keywordId: number;
}
