import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BrandEntity } from './bran.entity';

@Entity('competition_keywords')
export class CompetitionKeywords {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => BrandEntity, (brand) => brand._id)
  @JoinColumn({ name: 'ref_id' })
  brand: BrandEntity;
}
