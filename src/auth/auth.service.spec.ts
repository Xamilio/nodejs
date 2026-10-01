import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserService } from '../user/user.service.js';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  let authService: AuthService;
  let createUser: ReturnType<typeof vi.fn>;
  let validateCredentials: ReturnType<typeof vi.fn>;
  let signToken: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    createUser = vi.fn();
    validateCredentials = vi.fn();
    signToken = vi.fn().mockResolvedValue('signed.jwt.token');
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            create: createUser,
            validateCredentials,
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: signToken,
          },
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it('registers an active user and returns a signed access token', async () => {
    createUser.mockResolvedValue({
      id: 7,
      email: 'user@example.com',
      fullname: 'Test User',
      is_block: false,
    });

    await expect(
      authService.register({
        email: 'user@example.com',
        password: 'secret-password',
        fullname: 'Test User',
      }),
    ).resolves.toEqual({
      access_token: 'signed.jwt.token',
      token_type: 'Bearer',
    });
    expect(createUser).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret-password',
      fullname: 'Test User',
      is_block: false,
    });
    expect(signToken).toHaveBeenCalledWith({
      sub: 7,
      email: 'user@example.com',
    });
  });

  it('returns a token for valid credentials', async () => {
    validateCredentials.mockResolvedValue({
      id: 7,
      email: 'user@example.com',
    });

    await expect(
      authService.login({
        email: 'user@example.com',
        password: 'secret-password',
      }),
    ).resolves.toEqual({
      access_token: 'signed.jwt.token',
      token_type: 'Bearer',
    });
  });

  it('rejects invalid credentials', async () => {
    validateCredentials.mockResolvedValue(null);

    await expect(
      authService.login({
        email: 'user@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(signToken).not.toHaveBeenCalled();
  });
});
