import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmotionTrackerDto } from './dto/create-emotion_tracker.dto';
import {EmotionTracker} from "./emotion_tracker.entity";

@Injectable()
export class EmotionTrackerService {
  constructor(private prisma: PrismaService) {}

  getAll(userId?: number) {
    if (userId !== undefined) {
      return this.prisma.emotionTracker.findMany({ where: { userId } });
    }
    return this.prisma.emotionTracker.findMany();
  }

  getById(id: number) {
    return this.prisma.emotionTracker.findUnique({ where: { id } });
  }

  async create(
    createEmotionTrackerDto: CreateEmotionTrackerDto,
  ): Promise<EmotionTracker> {
    const createdTracker = await this.prisma.emotionTracker.create({
      data: createEmotionTrackerDto,
    });

    return new EmotionTracker(createdTracker);
  }

  update(id: number, data: any) {
    return this.prisma.emotionTracker.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.emotionTracker.delete({ where: { id } });
  }
}
