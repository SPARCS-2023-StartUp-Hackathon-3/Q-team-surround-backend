import { Body, Controller, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CookieOptions, Response } from 'express';
import { SetCookieInterceptor } from '../common/interceptors/set-cookie.interceptor';
import { CreateUserResponseDto } from '../user/dto/user-response.dto';
import { AuthService } from './auth.service';
import { KakaoLoginRequestDto, SigninRequestDto, SignupRequestDto } from './dtos/auth-request.dto';
import { KakaoLoginResponseDto, SigninResponseDto, SignupResponseDto } from './dtos/auth-response.dto';
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
  async signup(@Body() signuprequestDto: SignupRequestDto, @Res() response: Response): Promise<void> {
    const user: CreateUserResponseDto = await this.authService.signup(signuprequestDto);

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
  @ApiNotFoundResponse({ description: '데이터베이스에 존재하지 않는 유저입니다.' })
  @ApiBadRequestResponse({ description: '비밀번호가 일치하지 않습니다.' })
  @ApiUnauthorizedResponse({ description: '유효하지 않은 요청입니다.' })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async signin() {}

  @Post('kakao/login')
  @ApiOperation({ summary: 'Kakao 소셜 로그인' })
  @ApiBody({
    description: '카카오의 Acceess Token을 필요로 합니다.',
    type: KakaoLoginRequestDto,
  })
  @ApiCreatedResponse({ description: '카카오 로그인/회원가입에 성공했습니다.', type: KakaoLoginResponseDto })
  @ApiBadRequestResponse({
    description: '유효하지 않은 OAuth 토큰 혹은 존재하지 않는 이메일 수집 동의를 하지 않았습니다.',
  })
  async kakaoLogin(@Body() kakaoLoginRequestDto: KakaoLoginRequestDto, @Res() response: Response): Promise<void> {
    const user = await this.authService.kakaoLogin(kakaoLoginRequestDto);

    const accessToken: string = this.authService.issueAccessToken(user.id);

    const refreshToken: string = this.authService.issueRefreshToken(user.id);
    const refreshTokenCookieOptions: CookieOptions = this.authService.getCookieOptions('Refresh_token');

    await this.authService.setRefreshToken(user.id, refreshToken);

    const responseData: KakaoLoginResponseDto = { accessToken, userId: user.id };

    response.cookie('refresh_token', refreshToken, refreshTokenCookieOptions).json(responseData);
  }
}
