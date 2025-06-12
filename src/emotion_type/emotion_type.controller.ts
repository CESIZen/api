import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EmotionTypeService } from './emotion_type.service';
import { CreateEmotionTypeDto } from './dto/create-emotion_type.dto';
import { EmotionType } from './emotion_type.entity';

@Controller('emotion_types')
export class EmotionTypeController {
  constructor(private readonly emotion_typeService: EmotionTypeService) {}

  @Post()
  async create(@Body() data: CreateEmotionTypeDto): Promise<EmotionType> {
    return this.emotion_typeService.create(data);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.emotion_typeService.getById(Number(id));
  }

  @Get()
  async getAll() {
    return this.emotion_typeService.getAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.emotion_typeService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.emotion_typeService.delete(id);
  }
}
