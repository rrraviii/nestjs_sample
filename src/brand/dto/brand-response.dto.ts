import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { CommonDTO } from 'src/common/dto/CommonDTO';
import { Keyword } from 'src/keyword/entity/keyword.entity';

export class ResponseBrandDTO extends PartialType(CommonDTO) {
  @Expose()
  _id: number;
  @Expose()
  brandId: string;
  @Expose()
  name: string;
  @Expose()
  color: string;
  @Expose()
  isActivate: boolean;
  @Expose()
  keyword: Keyword[];
}
