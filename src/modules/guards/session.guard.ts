import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Token não informado');
    }

    try {
      const [, token] = authorization.split(' ');
      const decoded = await this.jwtService.verifyAsync(token);
      request.user_id = decoded.sub;

      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
