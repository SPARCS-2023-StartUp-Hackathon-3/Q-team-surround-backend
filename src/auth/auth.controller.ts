import { Body, Controller, Post, Res } from '@nestjs/common';
import { User } from '@prisma/client';
import { CookieOptions, Response } from 'express';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dtos/auth-request.dto';
import { SignupResponseDto } from './dtos/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signuprequestDto: SignupRequestDto, @Res() response: Response) {
    const user: Partial<User> = await this.authService.signup(signuprequestDto);

    const accessToken: string = this.authService.issueAccessToken(user.id);

    const refreshToken: string = this.authService.issueRefreshToken(user.id);
    const refreshTokenCookieOptions: CookieOptions = this.authService.getCookieOptions('Refresh_token');

    await this.authService.setRefreshToken(user.id, refreshToken);

    const responseData: SignupResponseDto = { accessToken, userId: user.id };

    response.cookie('refresh_token', refreshToken, refreshTokenCookieOptions).json(responseData);
  }
}
