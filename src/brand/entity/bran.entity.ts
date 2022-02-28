import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BrandKeywords } from './brandKeywords.entity';
import { BrandMappingCategory } from './category-mapping-brand.entity';
import { CompetitionKeywords } from './competition.entity';
import { TrendKeywords } from './trend.entity';

export interface IBrand {
  _id: number;
  id: string;
  name: string;
  brandKeywordList: BrandKeywords[]; // 자사브랜드
  competitionKeywordList: CompetitionKeywords[]; // 경쟁사 키워드
  trendKeywordList: TrendKeywords[]; // 시장키워드
  isActivate: boolean;
  crawlingIntervalSec: number;
  crawlingDays: number;
  hideServiceBrand: boolean;
}

@Entity('brand')
export class BrandEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  id: string;

  @Column()
  name: string;
  // category
  @OneToMany(() => BrandMappingCategory, (brandMappingCategory) => brandMappingCategory.brand)
  brandMappingCategory: BrandMappingCategory[];

  @OneToMany(() => BrandKeywords, (brand) => brand.brand)
  brandKeywordList: BrandKeywords[];

  @OneToMany(() => CompetitionKeywords, (competition) => competition.brand)
  competitionKeywordList: CompetitionKeywords[];

  @OneToMany(() => TrendKeywords, (trend) => trend.brand)
  trendKeywordList: TrendKeywords[];

  @Column({ nullable: true })
  isActivate: boolean;

  @Column({ nullable: true })
  crawlingIntervalSec: number;

  @Column({ nullable: true })
  crawlingDays: number;

  @Column({ nullable: true })
  hideServiceBrand: boolean;
}

export const createBrand = ({
  _id,
  id,
  name,
  brandMappingCategory,
  brandKeywordList,
  competitionKeywordList,
  trendKeywordList,
  isActivate,
  crawlingIntervalSec,
  crawlingDays,
  hideServiceBrand,
}: BrandEntity): BrandEntity => ({
  _id,
  id,
  name,
  brandMappingCategory,
  brandKeywordList,
  competitionKeywordList,
  trendKeywordList,
  isActivate,
  crawlingIntervalSec,
  crawlingDays,
  hideServiceBrand,
});

export const emptyBrand = createBrand({
  _id: 0,
  id: '',
  name: '',
  brandMappingCategory: [],
  brandKeywordList: [],
  competitionKeywordList: [],
  trendKeywordList: [],
  isActivate: false,
  crawlingIntervalSec: 0,
  crawlingDays: 0,
  hideServiceBrand: false,
});
