import { Module } from '@nestjs/common';
import { TrashcanStatusService } from './trashcan-status.service';
import { TrashcanStatusController } from './trashcan-status.controller';

@Module({
  providers: [TrashcanStatusService],
  controllers: [TrashcanStatusController]
})
export class TrashcanStatusModule {}
