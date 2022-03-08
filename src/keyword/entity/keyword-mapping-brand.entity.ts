import { BrandEntity } from 'src/brand/entity/bran.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Keyword } from './keyword.entity';

@Entity('keyword_mapping_brand')
export class KeywordMappingBrand {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Keyword, (keyword) => keyword.id)
  @JoinColumn({ name: 'keywordId' })
  keyword: Keyword;

  @ManyToOne((type) => BrandEntity, (brand) => brand._id)
  @JoinColumn({ name: 'brandId' })
  brand: BrandEntity;

  @Column({ default: true })
  isActive: boolean;
}
