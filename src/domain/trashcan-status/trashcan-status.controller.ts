import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateTrashcanStatusDto } from 'dto/trashcan-status/create-trashcan-status.dto';
import { TrashcanStatusService } from './trashcan-status.service';

@ApiTags('Trashcan-Status')
@Controller('trashcan-status')
export class TrashcanStatusController {
    constructor(private readonly trashcanStatusService: TrashcanStatusService) {}

    @ApiOperation({
        summary: '쓰레기통 상태 정보를 DB에 저장한다.',
    })
    @ApiBody({
        type: CreateTrashcanStatusDto,
        description: '쓰레기통 상태 정보'
    })
    @Post()
    create(@Body() createTrashcanStatusDto: CreateTrashcanStatusDto) {
        return this.trashcanStatusService.create(createTrashcanStatusDto);    
    }

    @ApiOperation({
        summary: '특정 ID를 가진 쓰레기통의 상태 정보를 반환한다.',
    })
    @ApiParam({
        name: 'id',
        description: '쓰레기통 상태 정보의 ID',
        example: '1',
        required: true,
    })
    @Get('trashcan-id/:id')
    findByTrashcanId(@Param('id') id: number) {
        return this.trashcanStatusService.findByTrashcanId(id);
    }

    @ApiOperation({
        summary: '특정 ID를 가진 상태 정보를 반환한다.',
    })
    @ApiParam({
        name: 'id',
        description: '쓰레기통 상태 정보의 ID',
        example: '1',
        required: true,
    })
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.trashcanStatusService.findOne(id);
    }

    @ApiOperation({
        summary: 'DB에 저장된 모든 쓰레기통 상태 정보를 반환한다.',
    })
    @Get()
    findAll() {
        return this.trashcanStatusService.findAll();
    }
    
    @ApiOperation({
        summary: '특정 쓰레기통의 모든 상태 정보를 삭제한다.',
    })
    @ApiParam({
        name: 'id',
        description: '상태 정보를 삭제하고자 하는 쓰레기통의 ID',
        example: '1',
        required: true
    })
    @Delete('trashcan-id/:id')
    removeByTrashcanId(@Param('id') id: number) {
        return this.trashcanStatusService.removeByTrashcanId(id);
    }

    @ApiOperation({
        summary: '특정 ID를 가진 쓰레기통 상태 정보를 삭제한다.',
    })
    @ApiParam({
        name: 'id',
        description: '삭제하고자 하는 청소 신청의 ID',
        example: '1',
        required: true
    })
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.trashcanStatusService.remove(id);
    }
}
