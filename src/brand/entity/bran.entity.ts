import { Category, emptyCategory } from 'src/category/entity/category.entity';
import { KeywordMappingBrand } from 'src/keyword/entity/keyword-mapping-brand.entity';
import { Keyword } from 'src/keyword/entity/keyword.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export interface IBrand {
  _id: number;
  brandId: string;
  name: string;
  color: string;
  isActivate: boolean;
  crawlingIntervalSec: number;
  crawlingDays: number;
  hideServiceBrand: boolean;
}

@Entity('brand')
export class BrandEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ unique: true })
  brandId: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToMany((type) => Category, (category) => category.brand)
  @JoinTable({ name: 'brand_mapping_category' })
  categories: Category[];

  @OneToMany(() => KeywordMappingBrand, (keywordMappingBrand) => keywordMappingBrand.brand)
  brands: KeywordMappingBrand[];

  @Column({ default: false })
  isActivate: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export const createBrand = ({
  _id,
  brandId,
  name,
  color,
  categories,
  brands,
  isActivate,
  createdAt,
  updatedAt,
}: BrandEntity): BrandEntity => ({
  _id,
  brandId,
  name,
  color,
  categories,
  brands,
  isActivate,
  createdAt,
  updatedAt,
});

export const emptyBrand = createBrand({
  _id: 0,
  brandId: '',
  name: '',
  color: '',
  categories: [],
  brands: [],
  isActivate: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});
