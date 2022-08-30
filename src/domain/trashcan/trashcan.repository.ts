import { Trashcan } from "entities/Trashcan";
import { TrashcanFullLog } from "entities/TrashcanFullLog";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Trashcan)
export class TrashcanRepository extends Repository<Trashcan> {
    async findAllByRange(lat: number, lon: number, type?: number) {
        const logCountQuery = this.createQueryBuilder("TrashcanFullLog")
            .subQuery()
            .select([
                'COUNT (*) AS logCount',
                'log.trashcanId AS trashcanId' 
            ])
            .from(TrashcanFullLog, 'log')
            .getQuery()

        const qb = this.createQueryBuilder("Trashcan")
            .leftJoin('Trashcan.trashcanFullLogs', 'log')
            .select([
                'Trashcan.id AS id',
                'Trashcan.type AS type',
                'Trashcan.address AS address',
                'Trashcan.latitude AS latitude',
                'Trashcan.longitude AS longitude'
            ])
            .addSelect(`6371 * ACOS(COS(RADIANS(${lat}))*COS(RADIANS(LATITUDE))*COS(RADIANS(LONGITUDE)-RADIANS(${lon}))+SIN(RADIANS(${lat}))*SIN(RADIANS(LATITUDE)))`, "distance")
            .leftJoin(logCountQuery, 'log', 'log.trashcanId = Trashcan.id')
            .addSelect('log.logCount AS count')
            .having('distance < 1')
            .addOrderBy('distance', 'ASC');
                
        if (type) {
            qb.andWhere('Trashcan.type = :type', { type });
        }
                  
        return await qb.getRawMany();
    }

    async findOneByRange(lat: number, lon: number, type: number) {
        const logCountQuery = this.createQueryBuilder("TrashcanFullLog")
            .subQuery()
            .select([
                'COUNT (*) AS logCount',
                'log.trashcanId AS trashcanId' 
            ])
            .from(TrashcanFullLog, 'log')
            .getQuery()

        return await this.createQueryBuilder("Trashcan")
            .leftJoin('Trashcan.trashcanFullLogs', 'log')
            .select([
                'Trashcan.id AS id',
                'Trashcan.type AS type',
                'Trashcan.address AS address',
                'Trashcan.latitude AS latitude',
                'Trashcan.longitude AS longitude'
            ])
            .addSelect(`6371 * ACOS(COS(RADIANS(${lat}))*COS(RADIANS(LATITUDE))*COS(RADIANS(LONGITUDE)-RADIANS(${lon}))+SIN(RADIANS(${lat}))*SIN(RADIANS(LATITUDE)))`, "distance")
            .leftJoin(logCountQuery, 'log', 'log.trashcanId = Trashcan.id')
            .addSelect('log.logCount AS count')
            .where('Trashcan.type = :type', { type })
            .having('distance < 1')
            .addOrderBy('distance', 'ASC')
            .getRawOne();
    }
}