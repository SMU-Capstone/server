import { Trashcan } from "entities/Trashcan";
import { TrashcanStatus } from "entities/TrashcanStatus";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Trashcan)
export class TrashcanRepository extends Repository<Trashcan> {
    async findAllByRange(lat: number, lon: number, type?: number) {
        const statusCountQuery = this.createQueryBuilder("TrashcanStatus")
            .subQuery()
            .select([
                'COUNT (*) AS statusCount',
                'status.trashcanId AS trashcanId' 
            ])
            .from(TrashcanStatus, 'status')
            .getQuery()

        const qb = this.createQueryBuilder("Trashcan")
            .leftJoin('Trashcan.trashcanStatuses', 'status')
            .select([
                'Trashcan.id AS id',
                'Trashcan.type AS type',
                'Trashcan.address AS address',
                'Trashcan.latitude AS latitude',
                'Trashcan.longitude AS longitude'
            ])
            .addSelect(`6371 * ACOS(COS(RADIANS(${lat}))*COS(RADIANS(LATITUDE))*COS(RADIANS(LONGITUDE)-RADIANS(${lon}))+SIN(RADIANS(${lat}))*SIN(RADIANS(LATITUDE)))`, "distance")
            // .leftJoinAndSelect('Trashcan.trashcanStatuses','status')
            // .loadRelationCountAndMap('Trashcan.statusCount', 'Trashcan.trashcanStatuses')
            .leftJoin(statusCountQuery, 'status', 'status.trashcanId = Trashcan.id')
            .addSelect('status.statusCount AS count')
            .having('distance < 1')
            .addOrderBy('distance', 'ASC');
                
        if (type) {
            qb.andWhere('Trashcan.type = :type', { type });
        }
                  
        return await qb.getRawMany();
    }

    async findOneByRange(lat: number, lon: number, type: number) {
        return await this.createQueryBuilder("Trashcan")
            .select([
                'Trashcan.id',
                'Trashcan.type',
                'Trashcan.address',
                'Trashcan.latitude',
                'Trashcan.longitude'
            ])
            .addSelect(`6371 * ACOS(COS(RADIANS(${lat}))*COS(RADIANS(LATITUDE))*COS(RADIANS(LONGITUDE)-RADIANS(${lon}))+SIN(RADIANS(${lat}))*SIN(RADIANS(LATITUDE)))`, "distance")
            .where('Trashcan.type = :type', { type })
            .having('distance < 1')
            .addOrderBy('distance', 'ASC')
            .getOne();
    }
}