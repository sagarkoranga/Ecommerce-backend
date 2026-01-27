import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;
    if (!auth) throw new UnauthorizedException('Token missing');

    const token = auth.split(' ')[1];
    try {
      req.user = jwt.verify(token, 'ADMIN_SECRET_KEY');
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}