import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { BadRequestException } from '@nestjs/common/exceptions';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.roleService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    const roleId = parseInt(id, 10);
    if (isNaN(roleId)) {
      throw new BadRequestException('Invalid role ID');
    }
    return this.roleService.deleteRole(roleId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateRole(@Param('id') id: string, @Body() data: any) {
    const roleId = parseInt(id, 10);
    if (isNaN(roleId)) {
      throw new BadRequestException('Invalid role ID');
    }
    return this.roleService.updateRole(roleId, data);
  }
}
