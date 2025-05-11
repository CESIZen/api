import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { BadRequestException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('loginDto', loginDto);
    return this.authService
      .validateUser(loginDto.email, loginDto.password)
      .then((user) => this.authService.login(user));
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('Données reçues pour register:', registerDto);
    if (!registerDto.email) {
      throw new BadRequestException('Email requis');
    }
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.name,
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }
}
