import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmotionDto } from './dto/create-emotion.dto';

@Injectable()
export class EmotionService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.emotion.findMany();
  }

  create(data: CreateEmotionDto) {
    return this.prisma.emotion.create({ data });
  }

  findOne(id: number) {
    return this.prisma.emotion.findUnique({
      where: { id: Number(id) },
    });
  }

  update(id: number, data: CreateEmotionDto) {
    return this.prisma.emotion.update({
      where: { id: Number(id) },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.emotion.delete({
      where: { id: Number(id) },
    });
  }
}