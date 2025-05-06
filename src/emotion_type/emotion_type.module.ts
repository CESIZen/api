import { Module } from '@nestjs/common';
import { EmotionTypeController } from './emotion_type.controller';
import { EmotionTypeService } from './emotion_type.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmotionTypeController],
  providers: [EmotionTypeService, PrismaService],
})
export class EmotionTypeModule {}
