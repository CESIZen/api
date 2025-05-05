import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    console.log('user', user);


    if (user) {
      const hashedPassword = await bcrypt.hash('Password', 10);
      const isPasswordValid = await bcrypt.compare(pass, hashedPassword);

      if (isPasswordValid) {
        const { password, ...result } = user;
        console.log('result', result);
        return result;
      }
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    console.log('login');
    const payload = { email: user.email, sub: user.id, roleId: user.roleId, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}