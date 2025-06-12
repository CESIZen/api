import { AuthService } from '../../src/auth/auth.service';
import { UserService } from '../../src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: any;
  let jwtService: any;

  const mockUser = {
    id: 1,
    email: 'test@mail.com',
    password: 'hashed',
    name: 'Test',
    roleId: 2,
    resetToken: null,
  };

  beforeEach(() => {
    userService = {
      getUserByEmail: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      getUserByResetToken: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('jwt-token'),
    };
    service = new AuthService(userService, jwtService);
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('retourne l\'utilisateur sans le mot de passe si valide', async () => {
      userService.getUserByEmail.mockResolvedValue(mockUser);
      require('bcrypt').compare.mockResolvedValue(true);

      const result = await service.validateUser('test@mail.com', 'pass');
      expect(userService.getUserByEmail).toHaveBeenCalledWith('test@mail.com');
      expect(result).toEqual({
        id: 1,
        email: 'test@mail.com',
        name: 'Test',
        roleId: 2,
        resetToken: null,
      });
    });

    it('lève une exception si email incorrect', async () => {
      userService.getUserByEmail.mockResolvedValue(null);
      await expect(service.validateUser('bad@mail.com', 'pass')).rejects.toThrow(UnauthorizedException);
    });

    it('lève une exception si mot de passe incorrect', async () => {
      userService.getUserByEmail.mockResolvedValue(mockUser);
      require('bcrypt').compare.mockResolvedValue(false);
      await expect(service.validateUser('test@mail.com', 'bad')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('retourne un access_token', async () => {
      const user = { id: 1, email: 'test@mail.com', name: 'Test', roleId: 2 };
      const result = await service.login(user);
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: user.email,
        sub: user.id,
        roleId: user.roleId,
        name: user.name,
      });
      expect(result).toEqual({ access_token: 'jwt-token' });
    });
  });

  describe('register', () => {
    it('crée un nouvel utilisateur', async () => {
      userService.getUserByEmail.mockResolvedValue(null);
      require('bcrypt').hash.mockResolvedValue('hashed');
      userService.createUser.mockResolvedValue({ ...mockUser, password: 'hashed' });

      const result = await service.register('test@mail.com', 'pass', 'Test');
      expect(userService.createUser).toHaveBeenCalledWith({
        email: 'test@mail.com',
        password: 'hashed',
        name: 'Test',
        roleId: 2,
      });
      expect(result).toEqual({
        id: 1,
        email: 'test@mail.com',
        name: 'Test',
        roleId: 2,
        resetToken: null,
      });
    });

    it('lève une exception si email déjà utilisé', async () => {
      userService.getUserByEmail.mockResolvedValue(mockUser);
      await expect(service.register('test@mail.com', 'pass', 'Test')).rejects.toThrow(BadRequestException);
    });
  });

  describe('forgotPassword', () => {
    it('retourne message si utilisateur non trouvé', async () => {
      userService.getUserByEmail.mockResolvedValue(null);
      const result = await service.forgotPassword('notfound@mail.com');
      expect(result).toEqual({ message: 'Utilisateur non trouvé' });
    });

    it('met à jour le resetToken et envoie un mail', async () => {
      userService.getUserByEmail.mockResolvedValue(mockUser);
      userService.updateUser.mockResolvedValue({});
      service.sendResetEmail = jest.fn();
      const result = await service.forgotPassword('test@mail.com');
      expect(userService.updateUser).toHaveBeenCalled();
      expect(service.sendResetEmail).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Email de réinitialisation envoyé' });
    });
  });

  describe('resetPassword', () => {
    it('retourne message si token invalide', async () => {
      userService.getUserByResetToken.mockResolvedValue(null);
      const result = await service.resetPassword('badtoken', 'newpass');
      expect(result).toEqual({ message: 'Token invalide' });
    });

    it('met à jour le mot de passe et resetToken', async () => {
      userService.getUserByResetToken.mockResolvedValue(mockUser);
      require('bcrypt').hash.mockResolvedValue('newhash');
      userService.updateUser.mockResolvedValue({});
      const result = await service.resetPassword('token', 'newpass');
      expect(userService.updateUser).toHaveBeenCalledWith(1, {
        password: 'newhash',
        resetToken: null,
      });
      expect(result).toEqual({ message: 'Mot de passe réinitialisé avec succès' });
    });
  });
});