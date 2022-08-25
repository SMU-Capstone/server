import { Module } from '@nestjs/common';
import { TrashcanFullLogService } from './trashcan-full-log.service';
import { TrashcanFullLogController } from './trashcan-full-log.controller';
import { TrashcanFullLog } from 'entities/TrashcanFullLog';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TrashcanFullLog])], 
  providers: [TrashcanFullLogService],
  controllers: [TrashcanFullLogController]
})
export class TrashcanFullLogModule {}
