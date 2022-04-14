import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './domain/application/application.module';
import { CleaningModule } from './domain/cleaning/cleaning.module';
import { TrashcanModule } from './domain/trashcan/trashcan.module';

import { Application } from 'entities/Application';
import { Cleaning } from 'entities/Cleaning';
import { Trashcan } from 'entities/Trashcan';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Application, Cleaning, Trashcan],
    dateStrings: true,
    synchronize: false,
    logging: true,
    keepConnectionAlive: true,
  }),
    ApplicationModule,
    CleaningModule,
    TrashcanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
