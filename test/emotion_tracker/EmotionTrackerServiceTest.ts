import { Test, TestingModule } from '@nestjs/testing';
import { EmotionTrackerService } from '../../src/emotion_tracker/emotion_tracker.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateEmotionTrackerDto } from '../../src/emotion_tracker/dto/create-emotion_tracker.dto';

describe('EmotionTrackerService', () => {
  let service: EmotionTrackerService;
  let prismaService: PrismaService;

  const mockEmotionTracker = {
    id: 1,
    userId: 1,
    emotionId: 1,
    intensity: 8,
    note: 'Test note',
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const createDto: CreateEmotionTrackerDto = {
    userId: 1,
    emotionId: 1,
    intensity: 8,
    note: 'Test note',
    date: new Date(),
  };

  const mockPrismaService = {
    emotionTracker: {
      create: jest.fn().mockResolvedValue(mockEmotionTracker),
      findUnique: jest.fn().mockResolvedValue(mockEmotionTracker),
      findMany: jest.fn().mockResolvedValue([mockEmotionTracker]),
      update: jest.fn().mockResolvedValue({ ...mockEmotionTracker, note: 'Updated note' }),
      delete: jest.fn().mockResolvedValue(mockEmotionTracker),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmotionTrackerService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EmotionTrackerService>(EmotionTrackerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new emotion tracker', async () => {
      const result = await service.create(createDto);

      expect(prismaService.emotionTracker.create).toHaveBeenCalledWith({
        data: createDto,
      });
      expect(result).toEqual(mockEmotionTracker);
    });
  });

  describe('getById', () => {
    it('should return a single emotion tracker by ID', async () => {
      const result = await service.getById(1);

      expect(prismaService.emotionTracker.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockEmotionTracker);
    });
  });

  describe('getAll', () => {
    it('should return all emotion trackers', async () => {
      const result = await service.getAll();

      expect(prismaService.emotionTracker.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockEmotionTracker]);
    });
  });

  describe('update', () => {
    it('should update an emotion tracker', async () => {
      const updateDto = { note: 'Updated note' };
      const result = await service.update(1, updateDto);

      expect(prismaService.emotionTracker.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
      expect(result).toEqual({ ...mockEmotionTracker, note: 'Updated note' });
    });
  });

  describe('delete', () => {
    it('should delete an emotion tracker', async () => {
      const result = await service.delete(1);

      expect(prismaService.emotionTracker.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockEmotionTracker);
    });
  });
});