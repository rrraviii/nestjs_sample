import { Category } from 'src/category/entity/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BrandEntity } from './bran.entity';

@Entity('brand_mapping_category')
export class BrandMappingCategory {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne((type) => BrandEntity, (brand) => brand._id)
  @JoinColumn({ name: 'ref_brandId' })
  brand: BrandEntity;

  @ManyToOne((type) => Category, (category) => category.id)
  @JoinColumn({ name: 'ref_categoryId' })
  category: Category;
}
