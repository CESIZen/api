import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() data: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create({ ...data });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(Number(id));
  }

  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
