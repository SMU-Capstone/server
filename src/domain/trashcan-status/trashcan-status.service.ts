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

    /* 새 쓰레기통 상태 정보를 DB 내에 생성한다. */
    async create(createTrashcanStatusDto: CreateTrashcanStatusDto): Promise<void> {
        await this.trashcanStatusRepository.save({
            isFull: createTrashcanStatusDto.isFull,
            trashcanId: createTrashcanStatusDto.trashcanId,
        }); 
    }

    /* DB에서 특정 ID를 가진 상태 정보를 조회한다. */ 
    findOne(id: number): Promise<TrashcanStatus> {
        return this.trashcanStatusRepository.findOne(id);
    }

    /* DB 내의 모든 상태 정보를 조회한다. */
    findAll(): Promise<TrashcanStatus[]> {
        return this.trashcanStatusRepository.find();
    }
    
    /* 특정 쓰레기통 ID를 가진 상태 정보를 조회한다. */
    async findByTrashcanId(id: number): Promise<TrashcanStatus[]> {
        const qb = this.trashcanStatusRepository
                    .createQueryBuilder("TrashcanStatus")
                    .select([
                        'TrashcanStatus.id',
                        'TrashcanStatus.isFull',
                    ])
                    .andWhere('TrashcanStatus.trashcanId = :id', { id });

        return qb.getMany();
    }

    // SOFT DELETE
    async remove(id: number): Promise<void> {
        await this.trashcanStatusRepository.softDelete(
            id
        );
    }

    /* 특정 쓰레기통 ID를 가진 상태 정보를 삭제한다. */
    async removeByTrashcanId(id: number): Promise<void> {
        const qb = await this.trashcanStatusRepository
                    .createQueryBuilder("TrashcanStatus")
                    .select([
                        'TrashcanStatus.id'
                    ])
                    .andWhere('TrashcanStatus.trashcanId = :id', { id })
                    .getMany();
        
        qb.forEach(async (trashcanStatus) => {
            await this.trashcanStatusRepository.softDelete(
                trashcanStatus.id
            );
        });
    }
}
