import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/enum/globales.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw (
        err ||
        new HttpException(
          'No se encuentra autorizado para acceder a esta API',
          HttpStatus.ACCEPTED,
        )
      );
    }
    return user;
  }
}
