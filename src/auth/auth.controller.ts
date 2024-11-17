import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.login.user')
  async loginUser() {
    return this.authService.loginUser();
  }
  @MessagePattern('auth.register.user')
  async register1User() {
    return this.authService.registerUser();
  }
  @MessagePattern('auth.verify.user')
  async verifyUser() {
    return this.authService.verifyToken();
  }
}
