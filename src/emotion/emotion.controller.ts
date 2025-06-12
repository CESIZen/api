import { Controller, Get, Post, Body, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import {AuthGuard} from "@nestjs/passport";

@Controller('emotions')
export class EmotionController {
  constructor(private readonly emotionService: EmotionService) {}

  @Get()
  findAll() {
    return this.emotionService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createEmotionDto: CreateEmotionDto) {
    return this.emotionService.create(createEmotionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emotionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmotionDto: CreateEmotionDto) {
    return this.emotionService.update(+id, updateEmotionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.emotionService.delete(+id);
  }
}