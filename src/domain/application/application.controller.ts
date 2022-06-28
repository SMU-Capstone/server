import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from '../../dto/application/create-application.dto';
import { UpdateApplicationDto } from '../../dto/application/update-application.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Application } from 'entities/Application';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiOperation({
    summary: '추가 쓰레기통 신청 정보를 DB에 저장한다.',
  })
  @ApiBody({
    type: CreateApplicationDto,
    description: '추가 쓰레기통 신청 정보'
  })
  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  @ApiOperation({
    summary: 'DB에 저장된 모든 추가 쓰레기통 신청 정보를 반환한다.',
  })
  @Get()
  findAll() {
    return this.applicationService.findAll();
  }

  @ApiOperation({
    summary: '특정 ID를 가진 추가 쓰레기통 신청 정보를 반환한다.',
  })
  @ApiParam({
    name: 'id',
    description: '추가 쓰레기통 신청 정보의 ID',
    example: '1',
    required: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(+id);
  }

  @ApiOperation({
    summary: '특정 ID를 가진 추가 쓰레기통 신청 정보를 수정한다.',
  })
  @ApiParam({
    name: 'id',
    description: '수정하고자 하는 추가 쓰레기통 신청 정보의 ID',
    example: '1',
    required: true,
  })
  @ApiBody({
    type: UpdateApplicationDto,
    description: '업데이트를 실시할 내용'
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @ApiOperation({
    summary: '특정 ID를 가진 추가 쓰레기통 신청 정보를 삭제한다.'
  })
  @ApiParam({
    name: 'id',
    description: '삭제하고자 하는 추가 쓰레기통 신청의 ID'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(+id);
  }
}
