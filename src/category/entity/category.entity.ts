// import { BrandMappingCategory } from 'src/brand/entity/category-mapping-brand.entity';
import { BrandEntity } from 'src/brand/entity/bran.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // category
  @ManyToMany((type) => BrandEntity, (brand) => brand.categories)
  brand: BrandEntity[];
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
