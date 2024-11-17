import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log(`Auth Database connected!👌`);
  }
  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, name, password } = registerUserDto;

    try {
      const user = await this.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user) {
        throw new RpcException({
          status: 400,
          message: 'User already exists',
        });
      }

      const newUser = await this.user.create({
        data: {
          email: email,
          password: password,
          name: name,
        },
      });

      return {
        user: newUser,
      };
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      });
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.user.findUnique({
        where: { email: email, password: password },
      });

      if (!user) {
        throw new RpcException({
          status: 400,
          message: 'User/Password not valid',
        });
      }

      // const isPasswordValid = bcrypt.compareSync(password, user.password);

      // if (!isPasswordValid) {
      //   throw new RpcException({
      //     status: 400,
      //     message: 'User/Password not valid',
      //   });
      // }

      // const { password: __, ...rest } = user;

      return {
        user,
        // token: await this.signJWT(rest),
      };
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      });
    }
  }

  verifyToken() {
    return 'verify token';
  }
}
