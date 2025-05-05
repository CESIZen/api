import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';

@Injectable()
export class InformationService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.information.findMany({
      include: { categories: true },
    });
  }

  getById(id: number) {
    return this.prisma.information.findUnique({
      where: { id },
      include: { categories: true },
    });
  }

  async create(data: CreateInformationDto) {
    const existingCategories = await this.prisma.category.findMany({
      where: { id: { in: data.categoryIds } },
    });

    const existingCategoryIds = existingCategories.map((cat) => cat.id);
    const invalidCategoryIds = data.categoryIds.filter(
      (id) => !existingCategoryIds.includes(id)
    );

    if (invalidCategoryIds.length > 0) {
      throw new Error(
        `Certaines catégories spécifiées n'existent pas : ${invalidCategoryIds.join(', ')}`
      );
    }

    return this.prisma.information.create({
      data: {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        isActive: data.isActive,
        userId: data.userId,
        categories: {
          create: data.categoryIds.map((id) => ({
            category: { connect: { id } },
          })),
        },
      },
      include: { categories: true },
    });
  }

  update(id: number, data: UpdateInformationDto) {
    return this.prisma.information.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        isActive: data.isActive,
        categories: {
          deleteMany: {},
          create: (data.categoryIds || []).map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
      include: { categories: true },
    });
  }
  delete(id: number) {
    return this.prisma.information.delete({ where: { id } });
  }
}