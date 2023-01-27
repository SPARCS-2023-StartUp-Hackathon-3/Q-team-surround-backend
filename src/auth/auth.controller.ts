import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CookieOptions, Response } from 'express';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dtos/auth-request.dto';
import { SignupResponseDto } from './dtos/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Local 회원가입' })
  @ApiBody({ description: 'email, nickname, password가 필요합니다.', type: SignupRequestDto })
  @ApiCreatedResponse({ description: '회원가입 성공', type: SignupResponseDto })
  @ApiBadRequestResponse({ description: '이미 존재하는 유저 혹은, 잘못된 요청' })
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
