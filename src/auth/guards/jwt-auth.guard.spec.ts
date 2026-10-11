import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserService } from '../../user/user.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let verifyToken: ReturnType<typeof vi.fn>;
  let hasRole: ReturnType<typeof vi.fn>;
  let isPublic: ReturnType<typeof vi.fn>;
  let requiredRoles: string[] | undefined;

  beforeEach(() => {
    verifyToken = vi.fn().mockResolvedValue({
      sub: 7,
      email: 'user@example.com',
    });
    hasRole = vi.fn();
    isPublic = vi.fn().mockReturnValue(false);
    requiredRoles = undefined;

    guard = new JwtAuthGuard(
      {
        getAllAndOverride: (key: string) =>
          key === 'isPublic' ? isPublic() : requiredRoles,
      } as unknown as Reflector,
      { verifyAsync: verifyToken } as unknown as JwtService,
      { hasRole } as unknown as UserService,
    );
  });

  function createContext(method: string, authorization = 'Bearer valid.token') {
    const request = {
      method,
      headers: { authorization },
      user: undefined,
    };
    const context = {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;

    return { context, request };
  }

  it('allows endpoints with required roles for users with a matching role', async () => {
    requiredRoles = ['admin'];
    hasRole.mockResolvedValue(true);
    const { context } = createContext('GET');

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(hasRole).toHaveBeenCalledWith(7, 'admin');
  });

  it('rejects endpoints with required roles for users without a matching role', async () => {
    requiredRoles = ['admin'];
    hasRole.mockResolvedValue(false);
    const { context } = createContext('POST');

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(hasRole).toHaveBeenCalledWith(7, 'admin');
  });

  it('does not check roles when the endpoint has no role metadata', async () => {
    const { context } = createContext('POST');

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(hasRole).not.toHaveBeenCalled();
  });

  it('allows the endpoint when the user has any of its required roles', async () => {
    requiredRoles = ['admin', 'moderator'];
    hasRole.mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    const { context } = createContext('PATCH');

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(hasRole).toHaveBeenNthCalledWith(1, 7, 'admin');
    expect(hasRole).toHaveBeenNthCalledWith(2, 7, 'moderator');
  });

  it('leaves public endpoints accessible without checking the role', async () => {
    isPublic.mockReturnValue(true);
    const { context } = createContext('POST', '');

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(verifyToken).not.toHaveBeenCalled();
    expect(hasRole).not.toHaveBeenCalled();
  });
});
