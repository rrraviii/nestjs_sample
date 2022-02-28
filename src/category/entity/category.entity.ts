import { BrandMappingCategory } from 'src/brand/entity/category-mapping-brand.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // category
  @OneToMany(() => BrandMappingCategory, (brandMappingCategory) => brandMappingCategory.category)
  brand: BrandMappingCategory[];
}

export const createCategory = ({ id, name, brand }: Category): Category => ({
  id,
  name,
  brand,
});

export const emptyCategory = createCategory({
  id: 0,
  name: '',
  brand: [],
});
