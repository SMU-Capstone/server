import { Module } from '@nestjs/common';
import { TrashcanService } from './trashcan.service';
import { TrashcanController } from './trashcan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrashcanRepository } from './trashcan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrashcanRepository])],
  controllers: [TrashcanController],
  providers: [TrashcanService],
})
export class TrashcanModule {}
