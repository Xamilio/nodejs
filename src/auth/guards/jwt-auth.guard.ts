import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import type {
  AccessTokenPayload,
  AuthenticatedRequest,
} from '../interfaces/authenticated-request.interface.js';
import { UserService } from '../../user/user.service.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      throw new UnauthorizedException('Потрібен Bearer-токен');
    }

    let payload: AccessTokenPayload;
    try {
      payload = await this._jwtService.verifyAsync<AccessTokenPayload>(token);
    } catch (error) {
      if (
        error instanceof Error &&
        ['JsonWebTokenError', 'TokenExpiredError', 'NotBeforeError'].includes(
          error.name,
        )
      ) {
        throw new UnauthorizedException('Недійсний або прострочений токен');
      }
      throw error;
    }

    if (!Number.isInteger(payload.sub) || typeof payload.email !== 'string') {
      throw new UnauthorizedException('Недійсний токен');
    }

    request.user = { sub: payload.sub, email: payload.email };

    const requiredRoles = this._reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    let hasRequiredRole = !requiredRoles?.length;
    for (const role of requiredRoles ?? []) {
      if (await this._userService.hasRole(payload.sub, role)) {
        hasRequiredRole = true;
        break;
      }
    }
    if (!hasRequiredRole) {
      throw new ForbiddenException('Недостатньо прав для виконання цієї дії');
    }

    return true;
  }
}
