import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextRequest = context.switchToHttp().getRequest();

    const authHeader = contextRequest.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token not found');
    }

    const token = authHeader.split(' ')[1];

    const isValid = this.authService.verifyAccessToken(token);

    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
