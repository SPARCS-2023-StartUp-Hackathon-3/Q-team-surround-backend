import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ALREADY_EXISTS_USER, INVALID_REQUEST } from '../common/consts/exception-messages.const';
import { CreateUserResponseDto } from '../user/dto/user-response.dto';
import { UserService } from '../user/user.service';
import { SignupRequestDto } from './dtos/auth-request.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EXPIRATION } from '../common/consts/token.const';
import { TokenType } from './types/token.enum';
import * as URL from 'url';
import { CookieOptions } from './types/cookie-option.interface';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
  ) {}

  async signup(signupRequestDto: SignupRequestDto): Promise<CreateUserResponseDto> {
    try {
      const { email, nickname, password } = signupRequestDto;
      const hashedPassword: string = await argon.hash(password);

      const newUser: CreateUserResponseDto = await this.userService.createUser({
        email,
        nickname,
        password: hashedPassword,
        provider: 'LOCAL',
      });

      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException(ALREADY_EXISTS_USER);
      }
      throw new BadRequestException(INVALID_REQUEST);
    }
  }

  issueAccessToken(userId: number): string {
    return this.jwtService.sign(
      { userId },
      { secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'), expiresIn: EXPIRATION.ACCESS_TOKEN * 1000 },
    );
  }

  issueRefreshToken(userId: number): string {
    return this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: EXPIRATION.REFRESH_TOKEN * 1000,
      },
    );
  }

  async setRefreshToken(userId: number, refreshToken: string) {
    await this.authRepository.setRefreshToken(userId, refreshToken);
  }

  getCookieOptions(tokenType: TokenType): CookieOptions {
    const maxAge = tokenType === 'Access_token' ? EXPIRATION.ACCESS_TOKEN : EXPIRATION.REFRESH_TOKEN;

    const domain =
      this.configService.get<string>('NODE_ENV') === 'prod'
        ? URL.parse(this.configService.get('CLIENT_URI')).host
        : 'localhost';

    return {
      httpOnly: true,
      maxAge,
      domain,
      secure: true,
    };
  }
}
