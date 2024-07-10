import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Client } from './client.schema';
import { MeterReading } from './meter-reading.schema';
import { AmountDetail } from './amount-detail.schema';
import { PaymentDetail } from './payment-detail.schema';
import * as mongoose from 'mongoose';

@Schema()
export class Bill extends Document {
  @Prop({ required: true })
  issueDate: Date;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true })
  companyLogo: string;

  @Prop({ required: true })
  billingSupportDetails: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }])
  clients: Client[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'MeterReading' }])
  meterReadings: MeterReading[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'AmountDetail' }])
  amountDetails: AmountDetail[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentDetail' }])
  paymentDetails: PaymentDetail[];
}

export const BillSchema = SchemaFactory.createForClass(Bill);
