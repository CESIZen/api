import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../../src/category/category.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateCategoryDto } from '../../src/category/dto/create-category.dto';
import { Category } from '../../src/category/category.entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let prismaService: PrismaService;

  // Mock d'une catégorie
  const mockCategory: Partial<Category> = {
    id: 1,
    name: 'News',
    color: '#0000FF',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  // Mock pour le DTO de création
  const createDto: CreateCategoryDto = {
    name: 'News',
    color: '#0000FF',
    isActive: true,
  };

  // Mock du service Prisma
  const mockPrismaService = {
    category: {
      create: jest.fn().mockResolvedValue(mockCategory),
      findUnique: jest.fn().mockResolvedValue(mockCategory),
      findMany: jest.fn().mockResolvedValue([mockCategory]),
      update: jest.fn().mockResolvedValue({ ...mockCategory, name: 'Updated News' }),
      delete: jest.fn().mockResolvedValue(mockCategory),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const result = await service.create(createDto);

      expect(prismaService.category.create).toHaveBeenCalledWith({
        data: createDto,
      });
      expect(result).toEqual(mockCategory);
    });
  });

  describe('getById', () => {
    it('should return a single category by ID', async () => {
      const result = await service.getById(1);

      expect(prismaService.category.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockCategory);
    });
  });

  describe('getAll', () => {
    it('should return all categories', async () => {
      const result = await service.getAll();

      expect(prismaService.category.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockCategory]);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateDto = { name: 'Updated News' };
      const result = await service.update(1, updateDto);

      expect(prismaService.category.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
      expect(result).toEqual({ ...mockCategory, name: 'Updated News' });
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      const result = await service.delete(1);

      expect(prismaService.category.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockCategory);
    });
  });
});