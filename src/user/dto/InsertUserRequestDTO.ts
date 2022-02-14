import { IsString } from 'class-validator';

export class InsertUserRequestDTO {
  readonly id: number;

  readonly userId: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly brandId: string;

  @IsString()
  readonly email: string;
}
