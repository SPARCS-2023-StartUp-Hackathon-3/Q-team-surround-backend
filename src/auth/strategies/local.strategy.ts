import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { INVALID_REQUEST } from '../../common/consts/exception-messages.const';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<number> {
    try {
      const { userId } = await this.authService.validateUser({ email, password });
      return userId;
    } catch (exception) {
      if (exception instanceof UnauthorizedException) {
        throw new UnauthorizedException(INVALID_REQUEST);
      }
      throw exception;
    }
  }
}
