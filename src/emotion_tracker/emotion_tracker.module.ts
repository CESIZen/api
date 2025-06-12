import { Module } from '@nestjs/common';
import { EmotionTrackerController } from './emotion_tracker.controller';
import { EmotionTrackerService } from './emotion_tracker.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmotionTrackerController],
  providers: [EmotionTrackerService, PrismaService],
})
export class EmotionTrackerModule {}
