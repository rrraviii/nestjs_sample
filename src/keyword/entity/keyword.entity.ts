import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { KeywordType } from '../dto/keyword-type';
import { KeywordMappingBrand } from './keyword-mapping-brand.entity';

@Entity('keyword')
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  keyword: string;

  // 수집 기간.
  @Column()
  crawlingDays: number;

  @Column({ nullable: true })
  crawlingIntervalSec: number;

  @Column({ nullable: true })
  hideServiceBrand: boolean;

  @Column({ type: 'enum', enum: KeywordType, enumName: 'KeywordType' })
  keywordType: KeywordType;

  @OneToMany(() => KeywordMappingBrand, (keywordMappingBrand) => keywordMappingBrand.keyword)
  keywordMappingBrandList: KeywordMappingBrand[];

  @Column({ default: false })
  isActivate: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export const createKeyword = ({
  id,
  keyword,
  crawlingDays,
  crawlingIntervalSec,
  hideServiceBrand,
  keywordType,
  keywordMappingBrandList,
  isActivate,
  createdAt,
  updatedAt,
}: Keyword): Keyword => ({
  id,
  keyword,
  crawlingDays,
  crawlingIntervalSec,
  hideServiceBrand,
  keywordType,
  keywordMappingBrandList,
  isActivate,
  createdAt,
  updatedAt,
});

export const emptyKeyword = createKeyword({
  id: 0,
  keyword: '',
  crawlingDays: 0,
  crawlingIntervalSec: 0,
  hideServiceBrand: false,
  keywordType: KeywordType.NONE,
  keywordMappingBrandList: [],
  isActivate: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});
