import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Bill } from './bill.schema';

@Schema()
export class AmountDetail extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Bill' })
  bill: Bill;

  @Prop({ required: true })
  electricityCharge: number;

  @Prop({ required: true })
  audiovisualCharge: number;

  @Prop({ required: true })
  iva: number;

  @Prop({ required: true })
  totalAmount: number;
}

export const AmountDetailSchema = SchemaFactory.createForClass(AmountDetail);
