import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../../src/category/category.controller';
import { CategoryService } from '../../src/category/category.service';
import { CreateCategoryDto } from '../../src/category/dto/create-category.dto';
import { Category } from '../../src/category/category.entity';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockCategory: Partial<Category> = {
    id: 1,
    name: 'News',
    color: '#0000FF',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  };

  const mockCreateDto: CreateCategoryDto = {
    name: 'News',
    color: '#0000FF',
    isActive: true
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockCategory),
    getById: jest.fn().mockResolvedValue(mockCategory),
    getAll: jest.fn().mockResolvedValue([mockCategory]),
    update: jest.fn().mockResolvedValue({ ...mockCategory, name: 'Updated News' }),
    delete: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const result = await controller.create(mockCreateDto);
      expect(service.create).toHaveBeenCalledWith({ ...mockCreateDto });
      expect(result).toEqual(mockCategory);
    });
  });

  describe('getById', () => {
    it('should return a single category by ID', async () => {
      const result = await controller.getById('1');
      expect(service.getById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCategory);
    });
  });

  describe('getAll', () => {
    it('should return all categories', async () => {
      const result = await controller.getAll();
      expect(service.getAll).toHaveBeenCalled();
      expect(result).toEqual([mockCategory]);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateDto = { name: 'Updated News' };
      const result = await controller.update(1, updateDto);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual({ ...mockCategory, name: 'Updated News' });
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      const result = await controller.delete(1);
      expect(service.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});