import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Bill } from './bill.schema';

@Schema()
export class PaymentDetail extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Bill' })
  bill: Bill;

  @Prop({ required: true })
  paymentAccount: string;

  @Prop({ required: true })
  pastDues: number;

  @Prop({ required: true })
  currentDue: number;

  @Prop({ required: true })
  paymentReference: string;

  @Prop({ required: true })
  qrCode: string;
}

export const PaymentDetailSchema = SchemaFactory.createForClass(PaymentDetail);
