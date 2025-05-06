import { Module } from '@nestjs/common';
import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EmotionController],
  providers: [EmotionService, PrismaService],
})
export class EmotionModule {}