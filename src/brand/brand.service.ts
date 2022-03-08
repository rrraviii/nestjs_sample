import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Category } from 'src/category/entity/category.entity';
import { CommonResponseDTO } from 'src/common/dto/CommonResponseDTO';
import { KeyWordParseMappingBrand } from 'src/keyword/dto/keyword-parse-mapping-brand.dto';
import { KeywordMappingBrand } from 'src/keyword/entity/keyword-mapping-brand.entity';
import { Keyword } from 'src/keyword/entity/keyword.entity';
import { EntityManager, Repository, Transaction, TransactionManager } from 'typeorm';
import { BrandRequestDTO } from './dto/brand-request.dto';
import { ResponseBrandDTO } from './dto/brand-response.dto';
import { BrandEntity, emptyBrand } from './entity/bran.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
    @InjectRepository(KeywordMappingBrand)
    private keywordMappingBrand: Repository<KeywordMappingBrand>,
    @InjectRepository(Keyword)
    private keywordRepository: Repository<Keyword>
  ) {}

  /**
  async getAll(): Promise<Brand[]> {
    const con = this.connection;
    const list = await this.brandModel.find().exec();
    console.log('list 확인중', list, con);
    return list;
  }
   */

  /**
   * 브랜드 전체 조회
   * @returns
   */
  async fetchAllBrandList(): Promise<BrandEntity[]> {
    return await this.brandRepository.find({ relations: ['categories'] });
  }

  /**
   * 브랜드 한건 (키워드 포함)
   * 조회시 brandId 파라미터로 받아야함. 현재는 테스트용도로 진행중.
   * 
   * 키워드 매핑테이블 조회시 
   *  -   KeyWordParseMappingBrand { id: 1, brandId: 1, keywordId: 1 },
      -   KeyWordParseMappingBrand { id: 2, brandId: 1, keywordId: 2 }
   * @returns
   */
  async fetchBrandInfo(): Promise<BrandEntity> {
    const brandEntity = await this.brandRepository.findOne({
      where: { _id: 1 },
    });

    const responseDTO = plainToInstance(ResponseBrandDTO, brandEntity);
    console.log('처음 response dto -=---', responseDTO);

    const mappingData = await this.parseKeywordMappingBrandList(brandEntity._id);
    const keywordIds = mappingData.map((v) => v.id);
    // 교차테이블을 메인으로 조회를 하면 교차테이블 + Keyword or brand 가 나옴
    const keywordList = await this.keywordMappingBrand.findByIds(keywordIds, { relations: ['keyword'] });

    console.log('교차 테이블 조회 ---', keywordList);
    const keywords = keywordList.map((v) => v.keyword);
    console.log('키워드만 뽑은것 확인중 ---', keywords);

    responseDTO.keyword = [...keywords];

    console.log('brand 에서 keyword 최종 데이타 확인중 --- ', responseDTO);

    return null;
  }

  /**
   * 특정 브랜드 id들을 기준으로 brand 조회
   * @param ids
   * @returns
   */
  async fetchBrandList(ids: number[]): Promise<BrandEntity[]> {
    return await this.brandRepository.findByIds(ids, { relations: ['categories'] });
  }

  /**
   * 브랜드 등록
   * @param newBrand
   *  @TransactionManager() transactionManager?: EntityManager
   */
  @Transaction()
  async insertBrand(brandData: BrandRequestDTO, @TransactionManager() transactionManager?: EntityManager): Promise<CommonResponseDTO> {
    const categoryInfo = await this.categoryRepository.findOne({
      where: { id: Number(brandData.categoryInfo.id) },
    });
    console.log('categoryInfo --', categoryInfo);

    // 1.브랜드 등록 - createMethod 만들어서 하자
    const createBrandEntity = emptyBrand;
    createBrandEntity.brandId = brandData.brandId;
    createBrandEntity.name = brandData.name;
    createBrandEntity.color = brandData.color;
    createBrandEntity.categories = [categoryInfo];

    const newBrand = { ...createBrandEntity };
    const saveBrand = await this.brandRepository.save(newBrand);

    const response: CommonResponseDTO = saveBrand._id > 0 ? { status: 200, result: 'OK' } : { status: 500, result: 'FAIL' };
    return response;
  }

  /**
   * 브랜드 상세정보
   * @param id
   */
  async detailBrandInfo(id: number): Promise<BrandEntity> {
    const brandDetailInfo = await this.brandRepository.findOne({
      relations: ['categories'],
      where: { _id: id },
    });

    console.log('@@@@@');
    console.log(brandDetailInfo);

    return brandDetailInfo;
  }

  /**
   * 교차테이블에서 BrandId 기준으로 데이터 조회
   * @param idList
   * @returns
   */
  async parseKeywordMappingBrandList(id: number): Promise<KeyWordParseMappingBrand[]> {
    const keyWordParseMappingBrand = await this.keywordMappingBrand
      .createQueryBuilder()
      .select('KeywordMappingBrand.id', 'id')
      .addSelect('KeywordMappingBrand.brandId ', 'brandId')
      .addSelect('KeywordMappingBrand.keywordId', 'keywordId')
      //.whereInIds(keyList).where("id IN (:id)", { id: request.ids })
      .where('KeywordMappingBrand.brandId IN (:id)', { id: id })
      .getRawMany<KeyWordParseMappingBrand>();

    return plainToInstance(KeyWordParseMappingBrand, keyWordParseMappingBrand);
  }
}
