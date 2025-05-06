import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmotionTypeDto } from './dto/create-emotion_type.dto';
import { EmotionTypeDto } from './dto/emotion_type.dto';

@Injectable()
export class EmotionTypeService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.emotionType.findMany();
  }

  getById(id: number) {
    return this.prisma.emotionType.findUnique({ where: { id: Number(id) } });
  }

  create(data: CreateEmotionTypeDto) {
    return this.prisma.emotionType.create({ data });
  }

  update(id: number, data: EmotionTypeDto) {
    return this.prisma.emotionType.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        color: data.color,
      },
    });
  }

  delete(id: number) {
    return this.prisma.emotionType.delete({ where: { id: Number(id) } });
  }


}
