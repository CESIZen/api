import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InformationService } from './information.service';
import { CreateInformationDto } from './dto/create-information.dto';
import { Information } from './information.entity';

@Controller('informations')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Post()
  async create(@Body() data: CreateInformationDto): Promise<Information> {
    return this.informationService.create({ ...data });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.informationService.getById(Number(id));
  }

  @Get()
  async getAll() {
    return this.informationService.getAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.informationService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.informationService.delete(id);
  }
}
