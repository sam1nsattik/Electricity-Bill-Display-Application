import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class User {
  @Prop()
  userName: string;
  @Prop({ type: String, unique: true })
  email: string;
  @Prop()
  phoneNumber: string;
  @Prop({ type: String, unique: true })
  cardNumber: string;
  @Prop()
  address: string;
  @Prop()
  other: string;
  @Prop()
  naturality: string;
  @Prop()
  family: string;
  @Prop({ type: Boolean, default: 0})
  isActiveProfile: boolean;
  

  @Prop({  type: Date, default: Date.now })
  created_at: Date;
  @Prop({  type: Date, default: Date.now })
  updated_at: Date;
  @Prop({ type: Date, default: null })
  deleted_at: Date;

}
export const UserSchema = SchemaFactory.createForClass(User);
