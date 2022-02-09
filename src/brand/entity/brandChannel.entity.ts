import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BrandEntity } from './bran.entity';

@Entity('brand_channel')
export class BrandChannel {
  @PrimaryGeneratedColumn()
  _id: string;

  @Column()
  name: string;

  @ManyToOne((type) => BrandEntity, (brand) => brand._id)
  @JoinColumn({ name: 'ref_id' })
  brand: BrandEntity;
}
