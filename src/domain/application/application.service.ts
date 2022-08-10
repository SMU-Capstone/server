import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'entities/Application';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from '../../dto/application/create-application.dto';
import { UpdateApplicationDto } from '../../dto/application/update-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  /*새 쓰레기통 추가 신청을 DB에 저장: create*/
  async create(createApplicationDto: CreateApplicationDto): Promise<void> {
    await this.applicationRepository.save({
      note: createApplicationDto.note,
      type: createApplicationDto.type,
      latitude: createApplicationDto.latitude,
      longitude: createApplicationDto.longitude,
    });
  }

  /* DB 내 모든 쓰레기통 추가 신청을 조회한다. */
  async findAll() : Promise<Application[] | null> {
    return this.applicationRepository.find();
  }
  
  /* DB에서 특정 ID의 쓰레기통 추가신청을 조회한다. */
  async findOne(id: number) : Promise<Application | null> {
    return this.applicationRepository.findOne(id);
  }

  //update
  async update(id: number, updateApplicationDto: UpdateApplicationDto) : Promise<void> {
    await this.applicationRepository.update(
      id,
      updateApplicationDto
    );
  }

  // SOFT DELETE
  async remove(id: number) : Promise<void> { 
    await this.applicationRepository.softDelete(
      id
    );
  }
}
