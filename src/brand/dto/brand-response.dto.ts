import { BrandBlockKeywords } from '../entity/brandBlockKeywords.entity';
import { BrandChannel } from '../entity/brandChannel.entity';
import { BrandKeywords } from '../entity/brandKeywords.entity';

export class ResponseBrandDTO {
  _id: number;
  id: string;
  name: string;
  logo: string;
  color: string;
  keywords: BrandKeywords[];
  blockKeywords: BrandBlockKeywords[];
  brandChannels: BrandChannel[];
  isActivate: boolean;
  crawlingIntervalSec: number;
  crawlingDays: number;
  hideServiceBrand: boolean;
}
