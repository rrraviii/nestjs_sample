import { Controller, Get, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Brand } from 'src/schema/brand/brand.schema';
import { Privileges } from 'src/user/decorator/privilege.decorator';
import { Roles } from 'src/user/decorator/role.decorator';
import { PrivilegeType } from 'src/user/security/privilege-type';
import { RoleType } from 'src/user/security/role-type';
import { BrandService } from './brand.service';
import { ResponseBrandDTO } from './dto/brand-response.dto';
import { CreateBrandDTO } from './dto/create-brand.dto';
import { BrandEntity } from './entity/bran.entity';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandSerivce: BrandService) {}

  @Get()
  async getAll(): Promise<Brand[]> {
    console.log('getAll 호출 되었나?');
    return await this.brandSerivce.getAll();
  }

  @Get('/test')
  test(): string {
    console.log('브랜드 테스트 ---');
    return JSON.stringify('brand Test');
  }

  @Post('/testInsert')
  testInsert(@Req() request: Request): string {
    console.log('body ', request.body);

    return JSON.stringify('성공');
  }

  /**
   * 브랜드 리스트 조회
   * @returns
   */
  @Get('/fetchAllBrandList')
  @Roles(RoleType.ADMIN)
  @Privileges(PrivilegeType.INSERT)
  async fetchAllBrandList(): Promise<ResponseBrandDTO[]> {
    return await this.brandSerivce.fetchAllBrandList();
  }

  /**
   * 1.브랜드를 등록하고
   * 2.브랜드에 맞는 사용자를 추가한다.
   */
  @Post('/insertBrand')
  async insertBrand(@Req() request: Request): Promise<string> {
    console.log('브랜드 등록->');
    const newBrand: CreateBrandDTO = request.body;
    console.log('new Brand !!!!!!!!!!!!');
    console.log(newBrand);
    return await this.brandSerivce.insertBrand(newBrand);
  }

  @Post('/detailBrandInfo')
  async detailBrandInfo(@Req() request: Request): Promise<BrandEntity> {
    console.log('req ,,,', request.body);
    return this.brandSerivce.detailBrandInfo(Number(request.body.id));
  }
}
