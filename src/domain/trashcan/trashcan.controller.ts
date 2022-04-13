import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrashcanService } from './trashcan.service';
import { CreateTrashcanDto } from '../../dto/trashcan/create-trashcan.dto';
import { UpdateTrashcanDto } from '../../dto/trashcan/update-trashcan.dto';

@Controller('trashcan')
export class TrashcanController {
  constructor(private readonly trashcanService: TrashcanService) {}

  @Post()
  create(@Body() createTrashcanDto: CreateTrashcanDto) {
    return this.trashcanService.create(createTrashcanDto);
  }

  @Get()
  findAll() {
    return this.trashcanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trashcanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrashcanDto: UpdateTrashcanDto) {
    return this.trashcanService.update(+id, updateTrashcanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trashcanService.remove(+id);
  }
}
