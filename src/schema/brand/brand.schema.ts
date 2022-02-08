import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BrandDocument = Brand & Document;

// 이색휘
@Schema({ collection: 'Brand', autoCreate: false, autoIndex: false })
export class Brand {
  @Prop(String)
  _id: string;

  @Prop(String)
  name: string;

  @Prop(String)
  logo: string;

  @Prop(String)
  color: string;

  @Prop([String])
  keywords: string[];
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
