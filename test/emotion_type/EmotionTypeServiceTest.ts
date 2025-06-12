import { Test, TestingModule } from '@nestjs/testing';
import { EmotionTypeService } from '../../src/emotion_type/emotion_type.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateEmotionTypeDto } from '../../src/emotion_type/dto/create-emotion_type.dto';

// Interface pour représenter l'entité
interface EmotionType {
  id: number;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

describe('EmotionTypeService', () => {
  let service: EmotionTypeService;
  let prismaService: PrismaService;

  // Mock d'un EmotionType
  const mockEmotionType: EmotionType = {
    id: 1,
    name: 'Positive',
    color: '#00FF00',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  // Mock pour le DTO de création
  const createDto: CreateEmotionTypeDto = {
    name: 'Positive',
    color: '#00FF00',
  };

  // Mock du service Prisma
  const mockPrismaService = {
    emotionType: {
      create: jest.fn().mockResolvedValue(mockEmotionType),
      findUnique: jest.fn().mockResolvedValue(mockEmotionType),
      findMany: jest.fn().mockResolvedValue([mockEmotionType]),
      update: jest.fn().mockResolvedValue({ ...mockEmotionType, name: 'Very Positive' }),
      delete: jest.fn().mockResolvedValue(mockEmotionType),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmotionTypeService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EmotionTypeService>(EmotionTypeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new emotion type', async () => {
      const result = await service.create(createDto);

      expect(prismaService.emotionType.create).toHaveBeenCalledWith({
        data: createDto,
      });
      expect(result).toEqual(mockEmotionType);
    });
  });

  describe('getById', () => {
    it('should return a single emotion type by ID', async () => {
      const result = await service.getById(1);

      expect(prismaService.emotionType.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockEmotionType);
    });
  });

  describe('getAll', () => {
    it('should return all emotion types', async () => {
      const result = await service.getAll();

      expect(prismaService.emotionType.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockEmotionType]);
    });
  });

  describe('update', () => {
    it('should update an emotion type', async () => {
      const updateDto = { name: 'Very Positive', color: 'blue' };
      const result = await service.update(1, updateDto);

      expect(prismaService.emotionType.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
      expect(result).toEqual({ ...mockEmotionType, name: 'Very Positive' });
    });
  });

  describe('delete', () => {
    it('should delete an emotion type', async () => {
      const result = await service.delete(1);

      expect(prismaService.emotionType.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockEmotionType);
    });
  });
});