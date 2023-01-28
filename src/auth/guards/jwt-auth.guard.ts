import { BadRequestException, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import { EXPIRED_TOKEN, INVALID_REQUEST } from '../../common/consts/exception-messages.const';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest<TUser = any>(err: any, user: any, info: any, _context: ExecutionContext, _status?: any): TUser {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException(EXPIRED_TOKEN);
    }

    if (!user) {
      throw new UnauthorizedException(INVALID_REQUEST);
    }

    return user;
  }
}
