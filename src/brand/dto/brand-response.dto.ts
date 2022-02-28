import { Category } from 'src/category/entity/category.entity';
import { BrandKeywords } from '../entity/brandKeywords.entity';
import { CompetitionKeywords } from '../entity/competition.entity';
import { TrendKeywords } from '../entity/trend.entity';

export class ResponseBrandDTO {
  _id: number;
  name: string;
  brandKeywordList: BrandKeywords[];
  competitionKeywordList: CompetitionKeywords[];
  trendKeywordList: TrendKeywords[];
  isActivate: boolean;
  crawlingIntervalSec: number;
  crawlingDays: number;
  hideServiceBrand: boolean;
}
