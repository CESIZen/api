import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EmotionTrackerService } from './emotion_tracker.service';
import { CreateEmotionTrackerDto } from './dto/create-emotion_tracker.dto';
import { EmotionTracker } from './emotion_tracker.entity';

@Controller('emotion_trackers')
export class EmotionTrackerController {
  constructor(private readonly emotion_trackerService: EmotionTrackerService) {}

  @Post()
  async create(@Body() data: CreateEmotionTrackerDto): Promise<EmotionTracker> {
    return this.emotion_trackerService.create({ ...data });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.emotion_trackerService.getById(Number(id));
  }

  @Get()
  async getAll() {
    return this.emotion_trackerService.getAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.emotion_trackerService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.emotion_trackerService.delete(id);
  }
}
