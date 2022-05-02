import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TrashcanService } from './trashcan.service';
import { CreateTrashcanDto } from '../../dto/trashcan/create-trashcan.dto';
import { UpdateTrashcanDto } from '../../dto/trashcan/update-trashcan.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Trashcan } from 'entities/Trashcan';

@ApiTags('Trashcan')
@Controller('trashcan')
export class TrashcanController {
  constructor(private readonly trashcanService: TrashcanService) {}

  /* 주위 쓰레기통 정보 가져오기 */
  @ApiOperation({
    summary: '특정 좌표를 바탕으로 주위에 있는 쓰레기통의 정보들을 반환받는다.'
  })
  @Get('/range')
  async findRange(@Query('x') x: number, @Query('y') y: number): Promise<Trashcan[] | null > {
    const trashcanData =  await this.trashcanService.findRange(x,y);

    return trashcanData;
  }

  /* 특정 쓰레기통 정보 가져오기 */
  @ApiOperation({
    summary: 'DB에 저장된 쓰레기통 중 특정 ID를 가진 쓰레기통의 정보를 가져온다.'
  })
  @ApiParam({
    name: 'x',
    description: '사용자의 현재 위도를 쿼리스트링으로 받는다.',
    example: '37.576004',
    required: true,
  })
  @ApiParam({
    name: 'y',
    description: '사용자의 현재 경도를 쿼리스트링으로 받는다.',
    example: '126.973261',
    required: true,
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Trashcan> {
    const trashcanData = await this.trashcanService.findOne(+id);

    return trashcanData;
  }

  /* 쓰레기통 정보 생성 */
  @ApiOperation({
    summary: '새 쓰레기통을 생성한다.'
  })
  @ApiBody({
    type: CreateTrashcanDto,
  })
  @Post()
  create(@Body() createTrashcanDto: CreateTrashcanDto) {
    return this.trashcanService.create(createTrashcanDto);
  }

  /* 쓰레기통 리스트 가져오기 */
  @ApiOperation({
    summary: 'DB에 저장된 모든 쓰레기통의 정보를 가져온다.'
  })
  @Get()
  findAll() {
    return this.trashcanService.findAll();
  }

  /* 특정 쓰레기통 정보 업데이트 */
  @ApiOperation({
    summary: '특정 ID를 가진 쓰레기통의 정보를 업데이트한다.'
  })
  @ApiBody({
    type: UpdateTrashcanDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrashcanDto: UpdateTrashcanDto) {
    return this.trashcanService.update(+id, updateTrashcanDto);
  }

  /* 특정 쓰레기통 정보 삭제 */
  @ApiOperation({
    summary: '특정 ID를 가진 쓰레기통의 정보를 삭제한다.'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trashcanService.remove(+id);
  }
}