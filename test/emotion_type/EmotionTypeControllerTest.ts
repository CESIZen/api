import { Test, TestingModule } from '@nestjs/testing';
import { EmotionTypeController } from '../../src/emotion_type/emotion_type.controller';
import { EmotionTypeService } from '../../src/emotion_type/emotion_type.service';
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

describe('EmotionTypeController', () => {
  let controller: EmotionTypeController;
  let service: EmotionTypeService;

  // Mock d'un EmotionType
  const mockEmotionType: EmotionType = {
    id: 1,
    name: 'Positive',
    color: '#00FF00',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  // Mock pour le DTO
  const mockCreateDto: CreateEmotionTypeDto = {
    name: 'Positive',
    color: '#00FF00',
  };

  const updateDto = {
    name: 'Very Positive',
    color: '#00FF00',
  };

  // Service mocké - adapter les noms selon votre implémentation
  const mockService = {
    create: jest.fn().mockResolvedValue(mockEmotionType),
    getById: jest.fn().mockResolvedValue(mockEmotionType),
    getAll: jest.fn().mockResolvedValue([mockEmotionType]),
    update: jest.fn().mockResolvedValue({ ...mockEmotionType, name: 'Very Positive' }),
    delete: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmotionTypeController],
      providers: [
        {
          provide: EmotionTypeService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EmotionTypeController>(EmotionTypeController);
    service = module.get<EmotionTypeService>(EmotionTypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new emotion type', async () => {
      const result = await controller.create(mockCreateDto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(mockCreateDto);
      expect(result).toEqual(mockEmotionType);
    });
  });

  describe('getById', () => {
    it('should return a single emotion type by ID', async () => {
      const result = await controller.getById(1); // Utiliser le bon type (nombre)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.getById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockEmotionType);
    });
  });

  describe('getAll', () => {
    it('should return all emotion types', async () => {
      const result = await controller.getAll();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.getAll).toHaveBeenCalled();
      expect(result).toEqual([mockEmotionType]);
    });
  });

  describe('update', () => {
    it('should update an emotion type', async () => {
      const result = await controller.update(1, updateDto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual({ ...mockEmotionType, name: 'Very Positive' });
    });
  });

  describe('delete', () => {
    it('should delete an emotion type', async () => {
      const result = await controller.delete(1); // Utiliser le bon type (nombre)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});