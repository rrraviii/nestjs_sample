import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Privileges } from 'src/user/decorator/privilege.decorator';
import { Roles } from 'src/user/decorator/role.decorator';
import { PrivilegeType } from 'src/user/security/privilege-type';
import { RoleType } from 'src/user/security/role-type';
import { BrandService } from './brand.service';
import { ResponseBrandDTO } from './dto/brand-response.dto';
import { BrandRequestDTO } from './dto/brand-request.dto';
import { BrandEntity } from './entity/bran.entity';
import { CommonResponseDTO } from 'src/common/dto/CommonResponseDTO';
import { emptyKeyword } from 'src/keyword/entity/keyword.entity';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandSerivce: BrandService) {}

  /**
  @Get()
  async getAll(): Promise<Brand[]> {
    console.log('getAll 호출 되었나?');
    return await this.brandSerivce.getAll();
  }
   */

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
    const brandEntityList = await this.brandSerivce.fetchAllBrandList();
    const responseList = brandEntityList.map((v) => {
      const responseDTO: ResponseBrandDTO = {
        ...v,
        keyword: [],
      };
      return responseDTO;
    });
    return responseList;
  }

  /**
   * 브랜드 한건 (등록한 키워드 리스트 포함하여 조회)
   */
  @Get('/fetchBrandInfo')
  async fetchBrandInfo(): Promise<ResponseBrandDTO> {
    const brandEntity = await this.brandSerivce.fetchBrandInfo();
    return null;
  }

  /**
   * 1.브랜드를 등록하고
   * 2.브랜드에 맞는 사용자를 추가한다.
   */
  @Post('/insertBrand')
  @HttpCode(200)
  async insertBrand(@Body() payload: BrandRequestDTO): Promise<CommonResponseDTO> {
    return await this.brandSerivce.insertBrand(payload);
  }

  @Post('/detailBrandInfo')
  async detailBrandInfo(@Req() request: Request): Promise<BrandEntity> {
    console.log('req ,,,', request.body);
    return this.brandSerivce.detailBrandInfo(Number(request.body.id));
  }
}
