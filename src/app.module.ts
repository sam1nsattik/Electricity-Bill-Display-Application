import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JsonResponseMiddleware } from './helper/json-response.middleware';
import { TimestampMiddleware } from './helper/timestamp.middleware';
//import { DeletedAtMiddleware } from './helper/deleted-at.middleware';
import { Bill, BillSchema } from './schema/bill.schema';
import { Client, ClientSchema } from './schema/client.schema';
import { MeterReading, MeterReadingSchema } from './schema/meter-reading.schema';
import { AmountDetail, AmountDetailSchema } from './schema/amount-detail.schema';
import { PaymentDetail, PaymentDetailSchema } from './schema/payment-detail.schema';
import { BillService } from './service/bill/bill.service';
import { BillController } from 'src/controller/bill/bill.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
      },
    ),
    MongooseModule.forFeature([
      { name: Bill.name, schema: BillSchema },
      { name: Client.name, schema: ClientSchema },
      { name: MeterReading.name, schema: MeterReadingSchema },
      { name: AmountDetail.name, schema: AmountDetailSchema },
      { name: PaymentDetail.name, schema: PaymentDetailSchema },
    ])
  ],
  controllers: [
    BillController,
  ],
  providers: [BillService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JsonResponseMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer.apply(TimestampMiddleware).forRoutes('*');
  }
}
