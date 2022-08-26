import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTrashcanFullLogDto } from 'dto/trashcan-full-log/create-trashcan-full-log.dto';
import { TrashcanFullLog } from 'entities/TrashcanFullLog';
import { Repository } from 'typeorm';

@Injectable()
export class TrashcanFullLogService {
    constructor(
        @InjectRepository(TrashcanFullLog)
        private readonly trashcanFullLogRepository: Repository<TrashcanFullLog>,
    ) {}

    /* 새 쓰레기통 상태 정보를 DB 내에 생성한다. */
    async create(createTrashcanFullLogDto: CreateTrashcanFullLogDto): Promise<void> {
        await this.trashcanFullLogRepository.save({
            trashcanId: createTrashcanFullLogDto.trashcanId,
        }); 
    }

    /* DB에서 특정 ID를 가진 상태 정보를 조회한다. */ 
    findOne(id: number): Promise<TrashcanFullLog> {
        return this.trashcanFullLogRepository.findOne(id);
    }

    /* DB 내의 모든 상태 정보를 조회한다. */
    findAll(): Promise<TrashcanFullLog[]> {
        return this.trashcanFullLogRepository.find();
    }
    
    /* 특정 쓰레기통 ID를 가진 상태 정보를 조회한다. */
    async findByTrashcanId(id: number): Promise<TrashcanFullLog[]> {
        const qb = this.trashcanFullLogRepository
                    .createQueryBuilder("TrashcanFullLog")
                    .select([
                        'TrashcanFullLog.id',
                        'TrashcanFullLog.isFull',
                    ])
                    .andWhere('TrashcanFullLog.trashcanId = :id', { id });

        return qb.getMany();
    }

    // SOFT DELETE
    async remove(id: number): Promise<void> {
        await this.trashcanFullLogRepository.softDelete(
            id
        );
    }

    /* 특정 쓰레기통 ID를 가진 상태 정보를 삭제한다. */
    async removeByTrashcanId(id: number): Promise<void> {
        const qb = await this.trashcanFullLogRepository
                    .createQueryBuilder("TrashcanFullLog")
                    .select([
                        'TrashcanFullLog.id'
                    ])
                    .andWhere('TrashcanFullLog.trashcanId = :id', { id })
                    .getMany();
        
        qb.forEach(async (trashcanFullLog) => {
            await this.trashcanFullLogRepository.softDelete(
                trashcanFullLog.id
            );
        });
    }
}
