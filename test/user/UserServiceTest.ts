import { Test, TestingModule } from '@nestjs/testing';
import { InformationService } from '../../src/information/information.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateInformationDto } from '../../src/information/dto/create-information.dto';
import { Information } from '../../src/information/information.entity';
import { UpdateInformationDto } from '../../src/information/dto/update-information.dto';

describe('InformationService', () => {
  let service: InformationService;

  const mockInformation: Information = {
    id: 1,
    title: 'Test Info',
    content: 'Test content',
    imageUrl: 'https://example.com/image.jpg',
    isActive: true,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const createDto: CreateInformationDto = {
    title: 'Test Info',
    content: 'Test content',
    imageUrl: 'https://example.com/image.jpg',
    userId: 1,
    isActive: true,
    categoryIds: [1, 2],
  };

  const mockCategories = [
    { id: 1, name: 'News' },
    { id: 2, name: 'Events' },
  ];

  const mockCategoryInformation = [
    {
      categoryId: 1,
      informationId: 1,
      category: mockCategories[0]
    },
    {
      categoryId: 2,
      informationId: 1,
      category: mockCategories[1]
    },
  ];

  const mockPrismaService = {
    information: {
      findMany: jest.fn().mockResolvedValue([
        { ...mockInformation, categories: mockCategoryInformation }
      ]),
      findUnique: jest.fn().mockResolvedValue({
        ...mockInformation,
        categories: mockCategoryInformation
      }),
      create: jest.fn().mockResolvedValue(mockInformation),
      update: jest.fn().mockResolvedValue({
        ...mockInformation,
        title: 'Updated Info',
        categories: mockCategoryInformation
      }),
      delete: jest.fn().mockResolvedValue(mockInformation),
    },
    category: {
      findMany: jest.fn().mockResolvedValue(mockCategories),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InformationService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<InformationService>(InformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('doit retourner toutes les informations', async () => {
      const result = await service.getAll();

      expect(mockPrismaService.information.findMany).toHaveBeenCalledWith({
        include: { categories: true },
      });

      expect(result).toEqual([
        {
          ...mockInformation,
          categories: mockCategoryInformation,
        },
      ]);
    });
  });

  describe('getById', () => {
    it('doit retourner une seule information par ID', async () => {
      const result = await service.getById(1);

      expect(mockPrismaService.information.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { categories: true },
      });

      expect(result).toEqual({
        ...mockInformation,
        categories: mockCategoryInformation,
      });
    });
  });

  describe('create', () => {
    it('doit créer une information avec des catégories', async () => {
      const result = await service.create(createDto);

      expect(mockPrismaService.category.findMany).toHaveBeenCalledWith({
        where: { id: { in: [1, 2] } },
      });

      expect(mockPrismaService.information.create).toHaveBeenCalledWith({
        data: {
          title: createDto.title,
          content: createDto.content,
          imageUrl: createDto.imageUrl,
          userId: createDto.userId,
          isActive: createDto.isActive,
          categories: {
            create: [
              { category: { connect: { id: 1 } } },
              { category: { connect: { id: 2 } } },
            ],
          },
        },
        include: { categories: true },
      });

      expect(result).toEqual(mockInformation);
    });

    it('doit lever une erreur si une catégorie n\'existe pas', async () => {
      const invalidCreateDto = {
        ...createDto,
        categoryIds: [1, 999] // ID inexistant
      };

      mockPrismaService.category.findMany.mockResolvedValueOnce([
        { id: 1, name: 'News' }
      ]);

      await expect(service.create(invalidCreateDto)).rejects.toThrow(
        'Certaines catégories spécifiées n\'existent pas : 999'
      );
    });
  });

  describe('update', () => {
    it('doit mettre à jour une information avec catégories', async () => {
      const updateDto: UpdateInformationDto = {
        title: 'Updated Info',
        categoryIds: [3, 4]
      };

      const result = await service.update(1, updateDto);

      expect(mockPrismaService.information.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          title: 'Updated Info',
          content: undefined,
          imageUrl: undefined,
          isActive: undefined,
          categories: {
            deleteMany: {},
            create: [
              { category: { connect: { id: 3 } } },
              { category: { connect: { id: 4 } } },
            ],
          },
        },
        include: { categories: true },
      });

      expect(result).toEqual({
        ...mockInformation,
        title: 'Updated Info',
        categories: mockCategoryInformation,
      });
    });

    it('doit mettre à jour une information sans catégories', async () => {
      mockPrismaService.information.update.mockClear();

      const updateDto: UpdateInformationDto = {
        title: 'Updated Info'
      };

      await service.update(1, updateDto);

      expect(mockPrismaService.information.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          title: 'Updated Info',
          content: undefined,
          imageUrl: undefined,
          isActive: undefined,
          categories: {
            deleteMany: {},
            create: [],
          },
        },
        include: { categories: true },
      });
    });
  });

  describe('delete', () => {
    it('doit supprimer une information', async () => {
      const result = await service.delete(1);

      expect(mockPrismaService.information.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      expect(result).toEqual(mockInformation);
    });
  });
});
