import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trashcan } from 'entities/Trashcan';
import { CreateTrashcanDto } from '../../dto/trashcan/create-trashcan.dto';
import { UpdateTrashcanDto } from '../../dto/trashcan/update-trashcan.dto';
import { TrashcanRepository } from './trashcan.repository';


@Injectable()
export class TrashcanService {
  constructor(
    @InjectRepository(TrashcanRepository)
    private readonly trashcanRepository: TrashcanRepository,
  ) {}

  /* 새 쓰레기통을 DB 내에 생성한다.*/
  async create(createTrashcanDto: CreateTrashcanDto): Promise<void> {
    await this.trashcanRepository.save({
      address: createTrashcanDto.address,
      type: createTrashcanDto.type,
      latitude: createTrashcanDto.latitude,
      longitude: createTrashcanDto.longitude,
    });
  }

  /* DB 내의 모든 쓰레기통을 조회한다. Pagination 적용 예정이긴 한데 해당 함수를 실제로 쓸 일이 있을지는 모르겠음 */
  findAll(): Promise<Trashcan[] | null> {
    return this.trashcanRepository.find();
  }

  /* 현재 위치를 x, y (위도, 경도)의 매개변수로 받아 그 주변 1km 내의 모든 쓰레기통을 조회한다. */
  async findAllByRange(lat: number, lon: number, type? : number): Promise<any> {
    let query;

    if (type) {
      query = await this.trashcanRepository.findAllByRange(lat, lon, type);
    }
    else {
      query = await this.trashcanRepository.findAllByRange(lat, lon);
    }

    return query.map(
      trashcan => ({
       id: trashcan.id,
       type: trashcan.type,
       address: trashcan.address,
       latitude: trashcan.latitude,
       longitude: trashcan.longitude,
       logCount: Number(trashcan.count)
      })
     );
  }

  /* 어떤 쓰레기통을 클릭하여 정보를 확인하고자 할 경우, 쓰레기통의 ID를 바탕으로 DB에 해당 쓰레기통을 조회하는 Query를 날리게 된다 */
  /* 추후 ID 기반이 아닌 좌표를 기반으로도 검색할 수 있도록 수정할 예정 */
  async findOne(id : number) : Promise<Trashcan | null> {
    const qb = await this.trashcanRepository
      .createQueryBuilder("Trashcan")
      .select([
        'Trashcan.id',
        'Trashcan.type',
        'Trashcan.address',
        'Trashcan.latitude',
        'Trashcan.longitude'
      ])
      .andWhere('Trashcan.id = :id', { id })

    return qb.getOne();
  }

  async findOneByRange(lat: number, lon: number, type: number) : Promise<Trashcan | null> {
    return this.trashcanRepository.findOneByRange(lat, lon, type);
  }
  
  // UPDATE
  async update(id: number, updateTrashcanDto: UpdateTrashcanDto): Promise<void> {
    await this.trashcanRepository.update(
      id,
      updateTrashcanDto
    );
  }

  // SOFT DELETE
  async remove(id: number): Promise<void> {
    await this.trashcanRepository.softDelete(
      id
    );
  }
}
