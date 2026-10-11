import type { Request } from 'express';

export interface AccessTokenPayload {
  sub: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: Pick<AccessTokenPayload, 'sub' | 'email'>;
}
