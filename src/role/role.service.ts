import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.role.findMany();
  }

  create(data: CreateRoleDto) {
    return this.prisma.role.create({ data });
  }

  findById(id: number) {
    id = Number(id);
    return this.prisma.role.findUnique({ where: { id } });
  }

  async deleteRole(roleId: number) {
    return this.prisma.role.delete({
      where: { id: roleId },
    });
  }

  async updateRole(roleId: number, data: CreateRoleDto) {
    return this.prisma.role.update({
      where: { id: roleId },
      data,
    });
  }
}