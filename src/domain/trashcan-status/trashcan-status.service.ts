import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTrashcanStatusDto } from 'dto/trashcan-status/create-trashcan-status.dto';
import { TrashcanStatus } from 'entities/TrashcanStatus';
import { Repository } from 'typeorm';

@Injectable()
export class TrashcanStatusService {
    constructor(
        @InjectRepository(TrashcanStatus)
        private readonly trashcanStatusRepository: Repository<TrashcanStatus>,
    ) {}

    async create(createTrashcanStatusDto: CreateTrashcanStatusDto): Promise<void> {
        await this.trashcanStatusRepository.save({
            isFull: createTrashcanStatusDto.isFull,
            trashcanId: createTrashcanStatusDto.trashcanId,
        });
    }


    findOne(id: number): Promise<TrashcanStatus> {
        return this.trashcanStatusRepository.findOne(id);
    }

    findAll(): Promise<TrashcanStatus[]> {
        return this.trashcanStatusRepository.find();
    }

    async remove(id: number): Promise<void> {
        await this.trashcanStatusRepository.softDelete(
            id
        );
    }
}
