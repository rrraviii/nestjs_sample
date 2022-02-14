import { IsString } from 'class-validator';

export class UserInfoDTO {
  @IsString()
  readonly _id: string;
  @IsString()
  readonly id: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly brandId: string;
  @IsString()
  readonly email: string;
}
