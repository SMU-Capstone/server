import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateTrashcanFullLogDto } from 'dto/trashcan-full-log/create-trashcan-full-log.dto';
import { TrashcanFullLogService } from './trashcan-full-log.service';

@ApiTags('Trashcan-Full-Log')
@Controller('trashcan-full-log')
export class TrashcanFullLogController {
    constructor(private readonly trashcanFullLogService: TrashcanFullLogService) {}

    @ApiOperation({
        summary: '쓰레기통 상태 정보를 DB에 저장한다.',
    })
    @ApiBody({
        type: CreateTrashcanFullLogDto,
        description: '쓰레기통 상태 정보'
    })
    @Post()
    create(@Body() createTrashcanFullLogDto: CreateTrashcanFullLogDto) {
        return this.trashcanFullLogService.create(createTrashcanFullLogDto);    
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
        return this.trashcanFullLogService.findByTrashcanId(id);
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
        return this.trashcanFullLogService.findOne(id);
    }

    @ApiOperation({
        summary: 'DB에 저장된 모든 쓰레기통 상태 정보를 반환한다.',
    })
    @Get()
    findAll() {
        return this.trashcanFullLogService.findAll();
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
        return this.trashcanFullLogService.removeByTrashcanId(id);
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
        return this.trashcanFullLogService.remove(id);
    }
}
