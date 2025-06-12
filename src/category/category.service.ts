import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.category.findMany();
  }

  getById(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const completeData = {
      ...data,
      isActive: data.isActive ?? true,
      color: data.color ?? 'defaultColor',
    };

    return this.prisma.category.create({ data: completeData });
  }

  update(id: number, data: any) {
    return this.prisma.category.update({
      where: { id: Number(id) },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.category.delete({
      where: { id: Number(id) },
    });
  }
}
