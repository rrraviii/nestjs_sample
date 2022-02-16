import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand, BrandSchema } from 'src/schema/brand/brand.schema';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandViewController } from './brandView.controller';
import { BrandEntity } from './entity/bran.entity';
import { BrandBlockKeywords } from './entity/brandBlockKeywords.entity';
import { BrandChannel } from './entity/brandChannel.entity';
import { BrandKeywords } from './entity/brandKeywords.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    TypeOrmModule.forFeature([BrandEntity, BrandBlockKeywords, BrandChannel, BrandKeywords]),
    JwtModule.register({ secret: 'PSJ', signOptions: { expiresIn: '300s' } }),
  ],
  controllers: [BrandController, BrandViewController],
  providers: [BrandService],
})
export class BrandModule {}
