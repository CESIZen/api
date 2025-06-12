import { Test, TestingModule } from '@nestjs/testing';
import { EmotionTrackerController } from '../../src/emotion_tracker/emotion_tracker.controller';
import { EmotionTrackerService } from '../../src/emotion_tracker/emotion_tracker.service';
import { CreateEmotionTrackerDto } from '../../src/emotion_tracker/dto/create-emotion_tracker.dto';
import { EmotionTracker } from '../../src/emotion_tracker/emotion_tracker.entity';

describe('EmotionTrackerController', () => {
  let controller: EmotionTrackerController;
  let service: EmotionTrackerService;

  // Mock d'un EmotionTracker avec toutes les propriétés requises
  const mockEmotionTracker: EmotionTracker = {
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

  // Mock pour le DTO avec la propriété date ajoutée
  const mockCreateDto: CreateEmotionTrackerDto = {
    userId: 1,
    emotionId: 1,
    intensity: 8,
    note: 'Test note',
    date: new Date(),
  };

  // Service mocké avec les noms de méthodes corrects
  const mockService = {
    create: jest
      .fn()
      .mockResolvedValue(mockEmotionTracker),
    getById: jest.fn().mockResolvedValue(mockEmotionTracker),
    getAll: jest.fn().mockResolvedValue([mockEmotionTracker]),
    update: jest.fn().mockResolvedValue({ ...mockEmotionTracker, note: 'Updated note' }),
    delete: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionTrackerController],
      providers: [
        {
          provide: EmotionTrackerService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EmotionTrackerController>(EmotionTrackerController);
    service = module.get<EmotionTrackerService>(EmotionTrackerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new emotion tracker', async () => {
      const result = await controller.create(mockCreateDto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith({ ...mockCreateDto });
      expect(result).toEqual(mockEmotionTracker);
    });
  });

  describe('getById', () => {
    it('should return a single emotion tracker by ID', async () => {
      const result = await controller.getById('1');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.getById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockEmotionTracker);
    });
  });

  describe('getAll', () => {
    it('should return all emotion trackers', async () => {
      const result = await controller.getAll();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.getAll).toHaveBeenCalled();
      expect(result).toEqual([mockEmotionTracker]);
    });
  });

  describe('update', () => {
    it('should update an emotion tracker', async () => {
      const updateDto = { note: 'Updated note' };
      const result = await controller.update(1, updateDto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual({ ...mockEmotionTracker, note: 'Updated note' });
    });
  });

  describe('delete', () => {
    it('should delete an emotion tracker', async () => {
      const result = await controller.delete(1);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});