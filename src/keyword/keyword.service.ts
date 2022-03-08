import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { BrandService } from 'src/brand/brand.service';
import { BrandEntity } from 'src/brand/entity/bran.entity';
import { Repository } from 'typeorm';
import { KeyWordParseMappingBrand } from './dto/keyword-parse-mapping-brand.dto';
import { ResponseKeywordDTO } from './dto/keyword-response.dto';
import { KeywordMappingBrand } from './entity/keyword-mapping-brand.entity';
import { Keyword } from './entity/keyword.entity';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(Keyword)
    private keywordRepository: Repository<Keyword>,
    @InjectRepository(KeywordMappingBrand)
    private keywordMappingBrand: Repository<KeywordMappingBrand>,
    private readonly brandService: BrandService,
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>
  ) {}

  /**
   * 키워드 전체 조회
   *  - 교차테이블 key 조회
   * @returns
   */
  async fetchKeywordList(): Promise<Keyword[]> {
    return await this.keywordRepository.find({ relations: ['keywordMappingBrandList'] });
  }

  /**
   * 최종 return ResponseDTO 생성해주는 메서드
   */
  async parseKeywordResponseDTO(keywordList: Keyword[]): Promise<ResponseKeywordDTO[]> {
    const result = plainToInstance(ResponseKeywordDTO, keywordList);

    /**
    const parseData = plainToInstance(ResponseKeywordDTO, keywordList).map((d) => {
      d.brandList = d.keywordMappingBrandList.map((b) => {
        console.log(b, b.brand, b.id, b.brand.brandId);
        return b.brand;
      });
      return d;
    });
    console.log('일단 데이터 만들고', parseData);
     */

    // const brandIdList = keywordMappingBrandList.map((v) => v.brandId);
    // const brandList = await this.brandService.fetchBrandList(brandIdList);

    /**
    const result = await keywordList.map(async (v) => {
      const instance = plainToInstance(ResponseKeywordDTO, v);
      let brandIds = [];
      keywordMappingBrandList.forEach((j) => {
        if (j.keywordId == v.id) {
          brandIds = [...brandIds, j.brandId];
        }
      });

      const brandList = await this.brandService.fetchBrandList(brandIds);
      instance.brandList = [...brandList];
      return instance;
    });
    console.log('chlwhd ------', result);
    */

    return [];
  }

  /**
   * keywordId 리스트를 기준으로 mapping 테이블 조회
   * @param keywordIdList
   * @returns
   */
  async parseKeywordMappingBrandList(idList: number[]): Promise<KeyWordParseMappingBrand[]> {
    const keyList = [...idList];
    const keyWordParseMappingBrand = await this.keywordMappingBrand
      .createQueryBuilder()
      .select('KeywordMappingBrand.id', 'id')
      .addSelect('KeywordMappingBrand.brandId ', 'brandId')
      .addSelect('KeywordMappingBrand.keywordId', 'keywordId')
      //.whereInIds(keyList).where("id IN (:id)", { id: request.ids })
      .where('keywordId IN (:id)', { id: keyList })
      .getRawMany<KeyWordParseMappingBrand>();

    return plainToInstance(KeyWordParseMappingBrand, keyWordParseMappingBrand);
  }

  /**
   * 키워드, 브랜드 매핑 데이터파싱
   * @param keywordList
   * @returns
   */
  // async parseKeywordListToMappingBrandList(keywordList: Keyword[]): Promise<KeyWordParseMappingBrand[]> {}

  /**
   * 키워드 리스트 - 매핑테이블 데이터 id list 뽑는 메서드.
   * @param keywordList
   * @returns
   */
  getKeywordMappingBrandIdList(keywordList: Keyword[]): number[] {
    let keyList: number[] = [];
    keywordList.forEach((v) => {
      v.keywordMappingBrandList.forEach((j) => {
        keyList = [...keyList, j.id];
      });
    });
    return keyList;
  }
}
