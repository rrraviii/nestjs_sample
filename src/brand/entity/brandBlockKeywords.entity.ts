import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BrandEntity } from './bran.entity';

@Entity('brandBlock_keyword')
export class BrandBlockKeywords {
  @PrimaryGeneratedColumn()
  _id: string;

  @Column()
  name: string;

  @ManyToOne((type) => BrandEntity, (brand) => brand._id)
  @JoinColumn({ name: 'ref_id' })
  brand: BrandEntity;
}
