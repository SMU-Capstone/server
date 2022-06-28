import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CleaningService } from './cleaning.service';
import { CreateCleaningDto } from '../../dto/cleaning/create-cleaning.dto';
import { UpdateCleaningDto } from '../../dto/cleaning/update-cleaning.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Cleaning } from 'entities/Cleaning';

@ApiTags('Cleaning')
@Controller('cleaning')
export class CleaningController {
  constructor(private readonly cleaningService: CleaningService) {}

  @ApiOperation({
    summary: '청소 신청 정보를 DB에 저장한다.',
  })
  @ApiBody({
    type: CreateCleaningDto,
    description: '청소 신청 정보'
  })
  @Post()
  create(@Body() createCleaningDto: CreateCleaningDto): Promise<void> {
    return this.cleaningService.create(createCleaningDto);
  }

  @ApiOperation({
    summary: 'DB에 저장된 모든 청소 신청 정보를 반환한다.',
  })
  @Get()
  findAll(): Promise<Cleaning[] | null> {
    return this.cleaningService.findAll();
  }

  @ApiOperation({
    summary: '특정 ID를 가진 청소 신청 정보를 반환한다.',
  })
  @ApiParam({
    name: 'id',
    description: '청소 신청 정보의 ID',
    example: '1',
    required: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cleaning | null> {
    return this.cleaningService.findOne(+id);
  }

  @ApiOperation({
    summary: '특정 ID를 가진 청소 신청 정보를 수정한다.',
  })
  @ApiParam({
    name: 'id',
    description: '수정하고자 하는 청소 신청 정보의 ID',
    example: '1',
    required: true,
  })
  @ApiBody({
    type: UpdateCleaningDto,
    description: '업데이트를 실시할 내용'
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCleaningDto: UpdateCleaningDto): Promise<void> {
    return this.cleaningService.update(+id, updateCleaningDto);
  }

  @ApiOperation({
    summary: '특정 ID를 가진 청소 신청 정보를 삭제한다.'
  })
  @ApiParam({
    name: 'id',
    description: '삭제하고자 하는 청소 신청의 ID'
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cleaningService.remove(+id);
  }
}
