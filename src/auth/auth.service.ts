import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    console.log('Utilisateur trouvé:', user);
    if (!user) {
      throw new UnauthorizedException('Email incorrect');
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    console.log('Mot de passe valide:', isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }
    const { password, ...result } = user;
    return result;
  }
  async login(user: any) {
    console.log('login');
    const payload = { email: user.email, sub: user.id, roleId: user.roleId, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string, name: string) {
    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email déjà utilisé');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({
      email,
      password: hashedPassword,
      name,
      roleId: 2,
    });
    const { password: _, ...result } = user;
    return result;
  }

  async forgotPassword(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return { message: 'Utilisateur non trouvé' };
    }
    const token = (await import('crypto')).randomBytes(32).toString('hex');
    await this.userService.updateUser(user.id, { resetToken: token });
    await this.sendResetEmail(email, token);
    return { message: 'Email de réinitialisation envoyé' };
  }

  async sendResetEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou autre service SMTP
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetUrl = `${process.env.BASE_URL}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetUrl}`,
      html: `<p>Cliquez sur ce lien pour réinitialiser votre mot de passe : <a href="${resetUrl}" target="_blank">${resetUrl}</a></p>`,
    });
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.userService.getUserByResetToken(token);
    if (!user) {
      return { message: 'Token invalide' };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.updateUser(user.id, { password: hashedPassword, resetToken: null });
    return { message: 'Mot de passe réinitialisé avec succès' };
  }
}
