import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from '../../dto/application/create-application.dto';
import { UpdateApplicationDto } from '../../dto/application/update-application.dto';
import { ApiTags } from '@nestjs/swagger';
import { Application } from 'entities/Application';

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  @Get()
  findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(+id);
  }
}
