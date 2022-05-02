import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trashcan } from 'entities/Trashcan';
import { Repository } from 'typeorm';
import { CreateTrashcanDto } from '../../dto/trashcan/create-trashcan.dto';
import { UpdateTrashcanDto } from '../../dto/trashcan/update-trashcan.dto';

@Injectable()
export class TrashcanService {
  constructor(
    @InjectRepository(Trashcan)
    private readonly trashcanRepository: Repository<Trashcan>,
  ) {}

  /* 새 쓰레기통을 DB 내에 생성한다.*/
  async create(createTrashcanDto: CreateTrashcanDto) {
    await this.trashcanRepository.save({
      address: createTrashcanDto.address,
      type: createTrashcanDto.type,
      x: createTrashcanDto.x,
      y: createTrashcanDto.y,
      });
    
    return `This action returns created trashcan`;
  }

  /* DB 내의 모든 쓰레기통을 조회한다. Pagination 적용 예정이긴 한데 해당 함수를 실제로 쓸 일이 있을지는 모르겠음 */
  async findAll(): Promise<Trashcan[] | null> {
    return this.trashcanRepository.find();
  }

  /* 현재 위치를 x, y (위도, 경도)의 매개변수로 받아 그 주변 1km 내의 모든 쓰레기통을 조회한다. */
  async findRange(x: number, y: number): Promise<Trashcan[] | null> {
    const qb =  await this.trashcanRepository
      .createQueryBuilder("Trashcan")
      .addSelect(`6371 * ACOS(COS(RADIANS(${x}))*COS(RADIANS(X))*COS(RADIANS(Y)-RADIANS(${y}))+SIN(RADIANS(${x}))*SIN(RADIANS(X)))`, "distance")
      .having(`distance <= 1`)
      .getMany()

      console.log(qb);

      return qb;
  }

  /* 어떤 쓰레기통을 클릭하여 정보를 확인하고자 할 경우, 쓰레기통의 ID를 바탕으로 DB에 해당 쓰레기통을 조회하는 Query를 날리게 된다 */
  async findOne(id: number) : Promise<Trashcan | null> {
    const result: Trashcan = await this.trashcanRepository.findOneBy({ id : id });

    return result;
  }

  async update(id: number, updateTrashcanDto: UpdateTrashcanDto): Promise<void> {
    await this.trashcanRepository.update(
      id,
      updateTrashcanDto
    );
  }

  async remove(id: number): Promise<void> {
    await this.trashcanRepository.softDelete(id);
  }
}
