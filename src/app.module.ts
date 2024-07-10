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
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST
      }:${parseInt(process.env.DB_PORT)}/?authMechanism=DEFAULT&authSource=${process.env.DB_NAME
      }`,
      {
        dbName: process.env.DB_NAME,
      },
    ),
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JsonResponseMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer.apply(TimestampMiddleware).forRoutes('*');
  }
}
