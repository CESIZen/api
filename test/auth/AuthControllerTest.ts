import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call validateUser and login', async () => {
      const dto = { email: 'test@mail.com', password: 'pass123' };
      const user = { id: 1, email: dto.email, name: 'Test', roleId: 2 };
      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.login.mockResolvedValue({ access_token: 'token' });

      const result = await controller.login(dto);
      expect(service.validateUser).toHaveBeenCalledWith(dto.email, dto.password);
      expect(service.login).toHaveBeenCalledWith(user);
      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('register', () => {
    it('should throw if email is missing', async () => {
      await expect(controller.register({ password: 'a', name: 'b' } as any))
        .rejects.toThrow(BadRequestException);
    });

    it('should call register on service', async () => {
      const dto = { email: 'a@b.com', password: 'pass', name: 'Test' };
      mockAuthService.register.mockResolvedValue({ id: 1, ...dto });
      const result = await controller.register(dto);
      expect(service.register).toHaveBeenCalledWith(dto.email, dto.password, dto.name);
      expect(result).toEqual({ id: 1, ...dto });
    });
  });

  describe('forgotPassword', () => {
    it('should call forgotPassword on service', async () => {
      mockAuthService.forgotPassword.mockResolvedValue({ message: 'ok' });
      const result = await controller.forgotPassword('a@b.com');
      expect(service.forgotPassword).toHaveBeenCalledWith('a@b.com');
      expect(result).toEqual({ message: 'ok' });
    });
  });

  describe('resetPassword', () => {
    it('should call resetPassword on service', async () => {
      mockAuthService.resetPassword.mockResolvedValue({ message: 'reset' });
      const result = await controller.resetPassword('token', 'newpass');
      expect(service.resetPassword).toHaveBeenCalledWith('token', 'newpass');
      expect(result).toEqual({ message: 'reset' });
    });
  });
});