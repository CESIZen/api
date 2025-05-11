import { Test, TestingModule } from '@nestjs/testing';
import { InformationController } from '../../src/information/information.controller';
import { InformationService } from '../../src/information/information.service';
import { CreateInformationDto } from '../../src/information/dto/create-information.dto';
import { Information } from '../../src/information/information.entity';

describe('InformationController', () => {
  let controller: InformationController;
  let service: InformationService;

  // Correction du mock Information avec toutes les propriétés requises
  const mockInformation: Information = {
    id: 1,
    title: 'Test Info',
    content: 'Test content',
    imageUrl: 'https://example.com/image.jpg',
    isActive: true,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  };

  // Correction du mock CreateInformationDto avec toutes les propriétés requises
  const mockCreateDto: CreateInformationDto = {
    title: 'Test Info',
    content: 'Test content',
    imageUrl: 'https://example.com/image.jpg',
    userId: 1,
    isActive: true,
    categoryIds: [1, 2]
  };

  // Format corrigé selon ESLint/Prettier
  const mockService = {
    create: jest
      .fn()
      .mockResolvedValue(mockInformation),
    getById: jest
      .fn()
      .mockResolvedValue(mockInformation),
    getAll: jest
      .fn()
      .mockResolvedValue([mockInformation]),
    update: jest
      .fn()
      .mockResolvedValue({ ...mockInformation, title: 'Updated Info' }),
    delete: jest
      .fn()
      .mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformationController],
      providers: [
        {
          provide: InformationService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<InformationController>(InformationController);
    service = module.get<InformationService>(InformationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('doit créer une informations', async () => {
      const result = await controller.create(mockCreateDto);

      // Correction des erreurs d'appels de méthode non liés
      expect(mockService.create).toHaveBeenCalledWith(mockCreateDto);
      expect(result).toEqual(mockInformation);
    });
  });

  describe('getById', () => {
    it('retourne une seul info avec son id', async () => {
      const result = await controller.getById('1');

      expect(mockService.getById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockInformation);
    });
  });

  describe('getAll', () => {
    it('doit retourner toutes les infos', async () => {
      const result = await controller.getAll();

      expect(mockService.getAll).toHaveBeenCalled();
      expect(result).toEqual([mockInformation]);
    });
  });

  describe('update', () => {
    it('doit mettre a jour une info', async () => {
      const updateDto = { title: 'Updated Info' };
      const result = await controller.update(1, updateDto);

      expect(mockService.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual({ ...mockInformation, title: 'Updated Info' });
    });
  });

  describe('delete', () => {
    it('doit supprimer une ifno<', async () => {
      const result = await controller.delete(1);

      expect(mockService.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});