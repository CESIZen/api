import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

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
}