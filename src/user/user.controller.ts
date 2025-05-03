import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.createUser({ ...data });
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(Number(userId));
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  async updateUser(@Param('id') userId: number, @Body() data: any) {
    return this.userService.updateUser(userId, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
