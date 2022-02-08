import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Brand, BrandDocument } from 'src/schema/brand/brand.schema';
//import { Brand, BrandDocument } from 'src/schema/brand/brand.schema';
import { CreateBrandDTO } from './dto/create-brand.dto';

@Injectable()
export class BrandService {
  //constructor(@InjectModel(Brand.name) private brandModel: Model<BrandDocument>) {}
  constructor(@InjectModel(Brand.name) private brandModel: Model<BrandDocument>, @InjectConnection() private connection: Connection) {}

  async getAll(): Promise<Brand[]> {
    const con = this.connection;
    console.log(con);
    console.log(con.name);
    console.log(con.readyState.valueOf());

    const list = await this.brandModel.find().exec();

    console.log('list 확인중', list);

    return list;
  }
}
