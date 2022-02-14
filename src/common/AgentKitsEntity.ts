import { Generated, PrimaryGeneratedColumn } from 'typeorm';

export class AgentKitsEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  _id: number;
}
