import { IsString } from 'class-validator';

export class CreateBrandDTO {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly logo: string;

  @IsString()
  readonly color: string;

  @IsString()
  readonly keywords: string[];
}
