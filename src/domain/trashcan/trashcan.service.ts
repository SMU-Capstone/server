import { Injectable } from '@nestjs/common';
import { CreateTrashcanDto } from '../../dto/trashcan/create-trashcan.dto';
import { UpdateTrashcanDto } from '../../dto/trashcan/update-trashcan.dto';

@Injectable()
export class TrashcanService {
  create(createTrashcanDto: CreateTrashcanDto) {
    return 'This action adds a new trashcan';
  }

  findAll() {
    return `This action returns all trashcan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trashcan`;
  }

  update(id: number, updateTrashcanDto: UpdateTrashcanDto) {
    return `This action updates a #${id} trashcan`;
  }

  remove(id: number) {
    return `This action removes a #${id} trashcan`;
  }
}
