import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'User', autoCreate: false, autoIndex: false })
export class User {
  @Prop(String)
  _id: string;

  @Prop(String)
  id: string;

  @Prop(Number)
  role: number;

  @Prop(String)
  name: string;

  @Prop(String)
  brandId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
