import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserReqDto } from '../user/dto/create-user.req.dto.js';
import { AuthService } from './auth.service.js';
import { LoginReqDto } from './dto/login.req.dto.js';
import { Public } from './decorators/public.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserReqDto) {
    return this._authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginReqDto) {
    return this._authService.login(loginDto);
  }
}
