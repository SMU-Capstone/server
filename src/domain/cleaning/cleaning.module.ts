import { Module } from '@nestjs/common';
import { CleaningService } from './cleaning.service';
import { CleaningController } from './cleaning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cleaning } from 'entities/Cleaning';

@Module({
  imports: [TypeOrmModule.forFeature([Cleaning])],
  controllers: [CleaningController],
  providers: [CleaningService]
})
export class CleaningModule {}
