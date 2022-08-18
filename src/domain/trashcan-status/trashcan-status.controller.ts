import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTrashcanStatusDto } from 'dto/trashcan-status/create-trashcan-status.dto';
import { TrashcanStatusService } from './trashcan-status.service';

@Controller('trashcan-status')
export class TrashcanStatusController {
    constructor(private readonly trashcanStatusService: TrashcanStatusService) {}

    @Post()
    create(@Body() createTrashcanStatusDto: CreateTrashcanStatusDto) {
        return this.trashcanStatusService.create(createTrashcanStatusDto);    
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.trashcanStatusService.findOne(id);
    }

    @Get()
    findAll() {
        return this.trashcanStatusService.findAll();
    }
    
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.trashcanStatusService.remove(id);
    }
}
