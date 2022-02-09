import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BrandEntity } from './bran.entity';

@Entity('brand_keyword')
export class BrandKeywords {
  @PrimaryGeneratedColumn()
  _id: string;

  @Column()
  name: string;

  @ManyToOne((type) => BrandEntity, (brand) => brand._id)
  @JoinColumn({ name: 'ref_id' })
  brand: BrandEntity;
}
