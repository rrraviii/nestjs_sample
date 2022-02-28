import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Model } from 'mongoose';
import { Category, emptyCategory } from 'src/category/entity/category.entity';
import { Brand, BrandDocument } from 'src/schema/brand/brand.schema';
import { Repository, Transaction } from 'typeorm';
import { ResponseBrandDTO } from './dto/brand-response.dto';
//import { Brand, BrandDocument } from 'src/schema/brand/brand.schema';
import { CreateBrandDTO } from './dto/create-brand.dto';
import { BrandEntity, emptyBrand } from './entity/bran.entity';
import { BrandKeywords } from './entity/brandKeywords.entity';
import { BrandMappingCategory } from './entity/category-mapping-brand.entity';
import { CompetitionKeywords } from './entity/competition.entity';
import { TrendKeywords } from './entity/trend.entity';

@Injectable()
export class BrandService {
  //constructor(@InjectModel(Brand.name) private brandModel: Model<BrandDocument>) {}
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    @InjectConnection() private connection: Connection,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(BrandMappingCategory)
    private brandMappingCategoryRepository: Repository<BrandMappingCategory>,
    @InjectRepository(BrandKeywords)
    private brandKeywordsRepository: Repository<BrandKeywords>,
    @InjectRepository(CompetitionKeywords)
    private competitionRepository: Repository<CompetitionKeywords>,
    @InjectRepository(TrendKeywords)
    private trendRepository: Repository<TrendKeywords>,
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>
  ) {}

  async getAll(): Promise<Brand[]> {
    const con = this.connection;
    const list = await this.brandModel.find().exec();
    console.log('list 확인중', list, con);
    return list;
  }

  /**
   * 브랜드 전체 조회
   * @returns
   */
  async fetchAllBrandList(): Promise<ResponseBrandDTO[]> {
    const brandEntity = await this.brandRepository.find();

    console.log('brandEntity', brandEntity);
    const returnData: ResponseBrandDTO[] = [...brandEntity];
    console.log('returnData', returnData);
    return returnData;
  }

  /**
   * 브랜드 등록
   * @param newBrand
   */
  @Transaction()
  async insertBrand(newBrand: CreateBrandDTO): Promise<string> {
    console.log('서비스 확인중', newBrand);

    // 1.브랜드 등록
    const createBrandEntity = emptyBrand;
    createBrandEntity.id = newBrand.id;
    createBrandEntity.name = newBrand.name;
    createBrandEntity.crawlingDays = newBrand.crawlingDays;

    console.log('[1].brand --> ');
    console.log(createBrandEntity);

    const saveBrandEntity = await this.brandRepository.save(createBrandEntity);

    // 2.카테고리
    const tmpCategory = emptyCategory;
    tmpCategory.id = newBrand.categoryInfo.id;
    tmpCategory.name = newBrand.categoryInfo.name;

    // 2.2. 카테고리 - 브랜드 매핑 테이블
    const parseBrandMappingCategory = new BrandMappingCategory();
    parseBrandMappingCategory.brand = saveBrandEntity;
    parseBrandMappingCategory.category = tmpCategory;
    this.brandMappingCategoryRepository.save(parseBrandMappingCategory);

    const parseBrandKeyword = newBrand.brandKeywordList.map((v) => {
      const tmp = new BrandKeywords();
      tmp.name = v;
      tmp.brand = saveBrandEntity;
      return tmp;
    });
    this.brandKeywordsRepository.save(parseBrandKeyword);

    // 경쟁사 키워드
    const parseCompetionKeyword = newBrand.competitionKeywordList.map((v) => {
      const tmp = new CompetitionKeywords();
      tmp.name = v;
      tmp.brand = saveBrandEntity;
      return tmp;
    });
    this.competitionRepository.save(parseCompetionKeyword);

    const parseTrendKeyword = newBrand.trendKeywordList.map((v) => {
      const tmp = new TrendKeywords();
      tmp.name = v;
      tmp.brand = saveBrandEntity;
      return tmp;
    });
    this.trendRepository.save(parseTrendKeyword);

    return 'insert Brand';
  }

  /**
   * 브랜드 상세정보
   * @param id
   */
  async detailBrandInfo(id: number): Promise<BrandEntity> {
    const brandDetailInfo = await this.brandRepository.findOne({
      relations: ['brandKeywordList', 'trendKeywordList', 'competitionKeywordList', 'brandMappingCategory'],
      where: { _id: id },
    });

    console.log('@@@@@');
    console.log(brandDetailInfo);

    return brandDetailInfo;
  }
}
