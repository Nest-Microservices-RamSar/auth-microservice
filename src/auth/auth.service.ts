import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  loginUser() {
    return 'login user';
  }

  registerUser() {
    return 'register user';
  }

  verifyToken() {
    return 'verify token';
  }
}
