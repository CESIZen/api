import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from '../../src/role/role.controller';
import { RoleService } from '../../src/role/role.service';

describe('RoleController', () => {
  let controller: RoleController;
  let service: RoleService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Admin' }]),
    create: jest.fn().mockResolvedValue({ id: 2, name: 'User' }),
    findById: jest.fn().mockResolvedValue({ id: 1, name: 'Admin' }),
    deleteRole: jest.fn().mockResolvedValue({ id: 1, name: 'Admin' }),
    updateRole: jest.fn().mockResolvedValue({ id: 1, name: 'SuperAdmin' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        { provide: RoleService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    service = module.get<RoleService>(RoleService);
  });

  it('findAll retourne tous les rôles', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, name: 'Admin' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('create crée un rôle', async () => {
    const dto = { name: 'User' };
    const result = await controller.create(dto);
    expect(result).toEqual({ id: 2, name: 'User' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('findById retourne un rôle', async () => {
    const result = await controller.findById(1);
    expect(result).toEqual({ id: 1, name: 'Admin' });
    expect(service.findById).toHaveBeenCalledWith(1);
  });

  it('deleteRole supprime un rôle', async () => {
    const result = await controller.deleteRole('1');
    expect(result).toEqual({ id: 1, name: 'Admin' });
    expect(service.deleteRole).toHaveBeenCalledWith(1);
  });

  it('updateRole met à jour un rôle', async () => {
    const dto = { name: 'SuperAdmin' };
    const result = await controller.updateRole('1', dto);
    expect(result).toEqual({ id: 1, name: 'SuperAdmin' });
    expect(service.updateRole).toHaveBeenCalledWith(1, dto);
  });
});