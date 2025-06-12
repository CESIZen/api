import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { User } from '../../src/user/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser: Partial<User> = {
    email: 'test@example.com',
    name: 'Test User',
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockCreateDto: CreateUserDto = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    roleId: 1,
  };

  const mockService = {
    createUser: jest.fn().mockResolvedValue(mockUser),
    getUserById: jest.fn().mockResolvedValue(mockUser),
    getAllUsers: jest.fn().mockResolvedValue([mockUser]),
    updateUser: jest.fn().mockResolvedValue({ ...mockUser, name: 'Updated User' }),
    deleteUser: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const result = await controller.createUser(mockCreateDto);
      expect(service.createUser).toHaveBeenCalledWith(mockCreateDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const result = await controller.getUserById('1');
      expect(service.getUserById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = await controller.getAllUsers();
      expect(service.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateDto = { name: 'Updated User' };
      const result = await controller.updateUser('1', updateDto);
      expect(service.updateUser).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual({ ...mockUser, name: 'Updated User' });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = await controller.deleteUser('1');
      expect(service.deleteUser).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});
