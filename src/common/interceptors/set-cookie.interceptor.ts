import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { TokenResponseDto } from '../../auth/dtos/auth-response.dto';
import { CookieOptions } from '../../auth/types/cookie-option.interface';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user;

    const accessToken: string = this.authService.issueAccessToken(userId);

    const refreshToken: string = this.authService.issueRefreshToken(userId);
    const refreshTokenCookieOptions: CookieOptions = this.authService.getCookieOptions('Refresh_token');

    await this.authService.setRefreshToken(userId, refreshToken);

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();

        const responseData: TokenResponseDto = { accessToken, userId };
        response.cookie('refresh_token', refreshToken, refreshTokenCookieOptions).json(responseData);
      }),
    );
  }
}
