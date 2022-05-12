import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cleaning } from 'entities/Cleaning';
import { Repository } from 'typeorm';
import { CreateCleaningDto } from '../../dto/cleaning/create-cleaning.dto';
import { UpdateCleaningDto } from '../../dto/cleaning/update-cleaning.dto';

@Injectable()
export class CleaningService {
  constructor(
    @InjectRepository(Cleaning)
    private readonly cleaningRepository: Repository<Cleaning>,
  ) {}

  /* 새 청소 신청을 DB 내에 생성한다. */
  async create(createCleaningDto: CreateCleaningDto): Promise<void> {
    await this.cleaningRepository.save({
      note: createCleaningDto.note,
      trashcanId: createCleaningDto.trashcanId,
    });
  }

  /* DB 내의 모든 청소 신청을 조회한다. */
  async findAll() : Promise<Cleaning[] | null> {
    return this.cleaningRepository.find();
  }

  /* DB에서 특정 ID를 가진 청소 신청을 조회한다. */
  async findOne(id: number) : Promise<Cleaning | null> {
    return this.cleaningRepository.findOneBy({id : id});
  }

  // UPDATE
  async update(id: number, updateCleaningDto: UpdateCleaningDto) : Promise<void> {
    await this.cleaningRepository.update(
      id,
      updateCleaningDto
    );
  }

  // SOFT DELETE
  async remove(id: number) : Promise<void> { 
    await this.cleaningRepository.softDelete(
      id
    );
  }
}
