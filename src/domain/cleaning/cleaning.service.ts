import { Injectable } from '@nestjs/common';
import { CreateCleaningDto } from '../../dto/cleaning/create-cleaning.dto';
import { UpdateCleaningDto } from '../../dto/cleaning/update-cleaning.dto';

@Injectable()
export class CleaningService {
  create(createCleaningDto: CreateCleaningDto) {
    return 'This action adds a new cleaning';
  }

  findAll() {
    return `This action returns all cleaning`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cleaning`;
  }

  update(id: number, updateCleaningDto: UpdateCleaningDto) {
    return `This action updates a #${id} cleaning`;
  }

  remove(id: number) {
    return `This action removes a #${id} cleaning`;
  }
}
