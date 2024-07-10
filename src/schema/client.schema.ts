import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Bill } from './bill.schema';

@Schema()
export class Client extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Bill' })
  bill: Bill;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true })
  nif: string;

  @Prop({ required: true })
  contractHolder: string;

  @Prop({ required: true })
  localConsumptionCode: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
