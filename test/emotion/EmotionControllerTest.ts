import { Test, TestingModule } from '@nestjs/testing';
import { EmotionController } from '../../src/emotion/emotion.controller';
import { EmotionService } from '../../src/emotion/emotion.service';
import { CreateEmotionDto } from '../../src/emotion/dto/create-emotion.dto';

// Définition d'une interface pour remplacer l'entité manquante
interface Emotion {
  id: number;
  name: string;
  color: string;
  emotionTypeId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

describe('EmotionController', () => {
  let controller: EmotionController;
  let service: EmotionService;

  // Mock d'une Emotion avec toutes les propriétés requises
  const mockEmotion: Emotion = {
    id: 1,
    name: 'Happy',
    color: '#FFD700',
    emotionTypeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  // Mock pour le DTO
  const mockCreateDto: CreateEmotionDto = {
    name: 'Happy',
    color: '#FFD700',
    emotionTypeId: 1,
  };

  // DTO pour la mise à jour
  const updateDto = {
    name: 'Very Happy',
    color: '#FFD700',
    emotionTypeId: 1,
  };

  // Service mocké avec les bons noms de méthodes
  const mockService = {
    create: jest.fn().mockResolvedValue(mockEmotion),
    findOne: jest.fn().mockResolvedValue(mockEmotion),
    findAll: jest.fn().mockResolvedValue([mockEmotion]),
    update: jest.fn().mockResolvedValue({ ...mockEmotion, name: 'Very Happy' }),
    delete: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionController],
      providers: [
        {
          provide: EmotionService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EmotionController>(EmotionController);
    service = module.get<EmotionService>(EmotionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new emotion', async () => {
      const result = await controller.create(mockCreateDto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(mockCreateDto);
      expect(result).toEqual(mockEmotion);
    });
  });

  describe('findOne', () => {
    it('should return a single emotion by ID', async () => {
      const result = await controller.findOne('1');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockEmotion);
    });
  });

  describe('findAll', () => {
    it('should return all emotions', async () => {
      const result = await controller.findAll();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockEmotion]);
    });
  });

  describe('update', () => {
    it('should update an emotion', async () => {
      const result = await controller.update('1', updateDto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual({ ...mockEmotion, name: 'Very Happy' });
    });
  });

  describe('delete', () => {
    it('should delete an emotion', async () => {
      const result = await controller.delete('1');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});