import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        roleId: data.roleId,
      },
    });
    return user;
  }

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async updateUser(id: number, data: Partial<User>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async getUserByResetToken(token: string) {
    return this.prisma.user.findFirst({
      where: { resetToken: token },
    });
  }
}
