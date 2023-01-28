import { Body, Controller, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CookieOptions, Response } from 'express';
import { SetCookieInterceptor } from '../common/interceptors/set-cookie.interceptor';
import { AuthService } from './auth.service';
import { SigninRequestDto, SignupRequestDto } from './dtos/auth-request.dto';
import { SigninResponseDto, SignupResponseDto } from './dtos/auth-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

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

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(SetCookieInterceptor)
  @ApiOperation({ summary: 'Local 로그인' })
  @ApiBody({ description: 'Local 로그인을 위해 이메일, 패스워드가 필요합니다.', type: SigninRequestDto })
  @ApiOkResponse({
    description: 'Local 로그인에 성공하여 액세스 토큰을 반환하고, 쿠키에 리프레시 토큰을 저장합니다.',
    type: SigninResponseDto,
  })
  async signin() {}
}
