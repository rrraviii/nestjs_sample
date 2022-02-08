import { Controller, Get } from '@nestjs/common';
import { Brand } from 'src/schema/brand/brand.schema';
// import { Brand } from 'src/schema/brand/brand.schema';
import { BrandService } from './brand.service';

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
}
