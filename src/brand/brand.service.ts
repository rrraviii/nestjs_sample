import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Model } from 'mongoose';
import { Brand, BrandDocument } from 'src/schema/brand/brand.schema';
import { Repository } from 'typeorm';
//import { Brand, BrandDocument } from 'src/schema/brand/brand.schema';
import { CreateBrandDTO } from './dto/create-brand.dto';
import { BrandEntity, createBrand, emptyBrand } from './entity/bran.entity';

@Injectable()
export class BrandService {
  //constructor(@InjectModel(Brand.name) private brandModel: Model<BrandDocument>) {}
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    @InjectConnection() private connection: Connection,

    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>
  ) {}

  async getAll(): Promise<Brand[]> {
    const con = this.connection;
    const list = await this.brandModel.find().exec();
    console.log('list 확인중', list);
    return list;
  }

  /**
   * 브랜드 등록
   * @param newBrand
   */
  async insertBrand(newBrand: CreateBrandDTO): Promise<string> {
    console.log('서비스 확인중', newBrand);

    const createBrandEntity = emptyBrand;
    createBrandEntity.id = newBrand.id;
    createBrandEntity.name = newBrand.name;
    createBrandEntity.logo = newBrand.logo;
    createBrandEntity.color = newBrand.color;

    console.log('-------------');
    console.log(createBrandEntity);

    this.brandRepository.insert(createBrandEntity);
    return 'insert Brand';
  }
}
