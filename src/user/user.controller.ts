import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: any) {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  async updateUser(@Param('id') userId: string, @Body() data: any) {
    return this.userService.updateUser(userId, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}