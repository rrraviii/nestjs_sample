import { Controller, Get, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { Brand } from 'src/schema/brand/brand.schema';
import { request, Request } from 'express';
import { BrandService } from './brand.service';
import { CreateBrandDTO } from './dto/create-brand.dto';
import { ResponseBrandDTO } from './dto/brand-response.dto';
import { BrandEntity } from './entity/bran.entity';
import { RolesGuard } from 'src/user/security/roles.guard';
import { Roles } from 'src/user/decorator/role.decorator';
import { PrivilegesGuard } from 'src/user/security/privileges.guard';

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
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['admin'])
  @UseGuards(PrivilegesGuard)
  @SetMetadata('privilege', ['INSERT'])
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
    return await this.brandSerivce.insertBrand(newBrand);
  }

  @Post('/detailBrandInfo')
  async detailBrandInfo(@Req() request: Request): Promise<BrandEntity> {
    console.log('req ,,,', request.body);
    return this.brandSerivce.detailBrandInfo(Number(request.body.id));
  }
}
