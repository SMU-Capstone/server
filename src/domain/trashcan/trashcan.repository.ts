import { Trashcan } from "entities/Trashcan";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Trashcan)
export class TrashcanRepository extends Repository<Trashcan> {
    async findAllByRange(lat: number, lon: number, type?: number) {
        const qb = this.createQueryBuilder("Trashcan")
            .select([
                'Trashcan.id',
                'Trashcan.type',
                'Trashcan.address',
                'Trashcan.latitude',
                'Trashcan.longitude'
            ])
            .addSelect(`6371 * ACOS(COS(RADIANS(${lat}))*COS(RADIANS(LATITUDE))*COS(RADIANS(LONGITUDE)-RADIANS(${lon}))+SIN(RADIANS(${lat}))*SIN(RADIANS(LATITUDE)))`, "distance")
            .having('distance < 1')
            .addOrderBy('distance', 'ASC');
                
        if (type) {
            qb.andWhere('Trashcan.type = :type', { type });
        }
                  
        return await qb.getMany();
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