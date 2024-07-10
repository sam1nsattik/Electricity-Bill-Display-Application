import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Bill } from './bill.schema';

@Schema()
export class MeterReading extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Bill' })
  bill: Bill;

  @Prop({ required: true })
  readingDate: Date;

  @Prop({ required: true })
  previousReading: number;

  @Prop({ required: true })
  currentReading: number;

  @Prop({ required: true })
  consumption: number;
}

export const MeterReadingSchema = SchemaFactory.createForClass(MeterReading);
