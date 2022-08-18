import { Module } from '@nestjs/common';
import { TrashcanStatusService } from './trashcan-status.service';
import { TrashcanStatusController } from './trashcan-status.controller';
import { TrashcanStatus } from 'entities/TrashcanStatus';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TrashcanStatus])], 
  providers: [TrashcanStatusService],
  controllers: [TrashcanStatusController]
})
export class TrashcanStatusModule {}
