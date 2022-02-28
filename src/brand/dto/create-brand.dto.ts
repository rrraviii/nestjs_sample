import { IsNumber, IsString } from 'class-validator';
import { CategoryInfoDTO } from 'src/category/dto/category-info.dto';

export class CreateBrandDTO {
  readonly id: string;

  @IsString()
  readonly name: string;

  // 브랜드 이미지
  readonly brandImg: File;

  // 카테고리
  readonly categoryInfo: CategoryInfoDTO;

  // 자사 브랜드 키워드 등록
  @IsString()
  readonly brandKeywordList: string[];

  // 경쟁사 키워드 등록
  @IsString()
  readonly competitionKeywordList: string[];

  // 시장 키워드 등록
  @IsString()
  readonly trendKeywordList: string[];

  //과거 데이터 수집 기간
  @IsNumber()
  readonly crawlingDays: number;
}
