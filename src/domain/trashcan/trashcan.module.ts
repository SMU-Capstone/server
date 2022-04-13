import { Module } from '@nestjs/common';
import { TrashcanService } from './trashcan.service';
import { TrashcanController } from './trashcan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trashcan } from 'entities/Trashcan';

@Module({
  imports: [TypeOrmModule.forFeature([Trashcan])],
  controllers: [TrashcanController],
  providers: [TrashcanService]
})
export class TrashcanModule {}
