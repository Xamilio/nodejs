import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserReqDto } from '../user/dto/create-user.req.dto.js';
import { UserService } from '../user/user.service.js';
import { LoginReqDto } from './dto/login.req.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserReqDto) {
    const user = await this._userService.create({
      email: createUserDto.email,
      password: createUserDto.password,
      fullname: createUserDto.fullname,
      is_block: false,
    });
    return this.createToken(user);
  }

  async login(loginDto: LoginReqDto) {
    const user = await this._userService.validateCredentials(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Неправильний email або пароль');
    }

    return this.createToken(user);
  }

  private async createToken(user: { id: number; email: string }) {
    const accessToken = await this._jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      access_token: accessToken,
      token_type: 'Bearer',
    };
  }
}
