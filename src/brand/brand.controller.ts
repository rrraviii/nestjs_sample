import { Controller, Get, Post, Req } from '@nestjs/common';
import { Brand } from 'src/schema/brand/brand.schema';
import { Request } from 'express';
import { BrandService } from './brand.service';
import { CreateBrandDTO } from './dto/create-brand.dto';

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
}
