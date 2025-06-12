import { RoleService } from '../../src/role/role.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('RoleService', () => {
  let service: RoleService;
  const mockPrisma = {
    role: {
      findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'Admin' }]),
      create: jest.fn().mockResolvedValue({ id: 2, name: 'User' }),
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'Admin' }),
      delete: jest.fn().mockResolvedValue({ id: 1, name: 'Admin' }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'SuperAdmin' }),
    },
  } as any;

  beforeEach(() => {
    service = new RoleService(mockPrisma);
  });

  it('findAll retourne tous les rôles', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, name: 'Admin' }]);
    expect(mockPrisma.role.findMany).toHaveBeenCalled();
  });

  it('create crée un rôle', async () => {
    const dto = { name: 'User' };
    const result = await service.create(dto);
    expect(result).toEqual({ id: 2, name: 'User' });
    expect(mockPrisma.role.create).toHaveBeenCalledWith({ data: dto });
  });

  it('findById retourne un rôle par ID', async () => {
    const result = await service.findById(1);
    expect(result).toEqual({ id: 1, name: 'Admin' });
    expect(mockPrisma.role.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('deleteRole supprime un rôle', async () => {
    const result = await service.deleteRole(1);
    expect(result).toEqual({ id: 1, name: 'Admin' });
    expect(mockPrisma.role.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('updateRole met à jour un rôle', async () => {
    const dto = { name: 'SuperAdmin' };
    const result = await service.updateRole(1, dto);
    expect(result).toEqual({ id: 1, name: 'SuperAdmin' });
    expect(mockPrisma.role.update).toHaveBeenCalledWith({ where: { id: 1 }, data: dto });
  });
});