import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * PrimaryGeneratedColumn : 이 annotion이 있다면 이 테이블은 해당 필드가 primary key 가 됩니다.
 * 괄호 안에 아무런 내용을 넣지 않으면 id 는 auto increment 가 적용됩니다.
 **/
@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  intra_id: string;

  @Column()
  nickname: string;
}
