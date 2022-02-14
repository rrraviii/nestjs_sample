import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BrandBlockKeywords } from './brandBlockKeywords.entity';
import { BrandChannel } from './brandChannel.entity';
import { BrandKeywords } from './brandKeywords.entity';

// 혹시 몰라서 만들어봄.
export interface IBrand {
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

@Entity('brand')
export class BrandEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  // user Table 에 존재하는 brandId 컬럼과 매핑되는값.
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  color: string;

  @OneToMany(() => BrandKeywords, (keyword) => keyword.brand)
  keywords: BrandKeywords[];

  @OneToMany(() => BrandBlockKeywords, (block) => block.brand)
  blockKeywords: BrandBlockKeywords[];

  @OneToMany(() => BrandChannel, (channel) => channel.brand)
  brandChannels: BrandChannel[];

  @Column()
  isActivate: boolean;

  @Column()
  crawlingIntervalSec: number;

  @Column()
  crawlingDays: number;

  @Column()
  hideServiceBrand: boolean;
}

export const createBrand = ({
  _id,
  id,
  name,
  logo,
  color,
  keywords,
  blockKeywords,
  brandChannels,
  isActivate,
  crawlingIntervalSec,
  crawlingDays,
  hideServiceBrand,
}: BrandEntity): BrandEntity => ({
  _id,
  id,
  name,
  logo,
  color,
  keywords,
  blockKeywords,
  brandChannels,
  isActivate,
  crawlingIntervalSec,
  crawlingDays,
  hideServiceBrand,
});

export const emptyBrand = createBrand({
  _id: 0,
  id: '',
  name: '',
  logo: '',
  color: '',
  keywords: [],
  blockKeywords: [],
  brandChannels: [],
  isActivate: false,
  crawlingIntervalSec: 0,
  crawlingDays: 0,
  hideServiceBrand: false,
});
