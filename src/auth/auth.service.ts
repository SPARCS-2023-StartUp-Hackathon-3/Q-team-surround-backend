import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import {
  ALREADY_EXISTS_USER,
  INVALID_REQUEST,
  NON_EXIST_USER,
  NOT_MATCHED,
} from '../common/consts/exception-messages.const';
import { CreateUserResponseDto } from '../user/dto/user-response.dto';
import { UserService } from '../user/user.service';
import { SigninRequestDto, SignupRequestDto } from './dtos/auth-request.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EXPIRATION } from '../common/consts/token.const';
import { TokenType } from './types/token.enum';
import * as URL from 'url';
import { CookieOptions } from './types/cookie-option.interface';
import { AuthRepository } from './auth.repository';
import { SigninResponseDto } from './dtos/auth-response.dto';
import { User } from '@prisma/client';

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

  async validateUser(signinRequestDto: SigninRequestDto): Promise<SigninResponseDto> {
    const { email, password } = signinRequestDto;
    const exUser: Partial<User> = await this.userService.findUserByEmail(email);

    if (!exUser) {
      throw new NotFoundException(NON_EXIST_USER);
    }

    const passwordMatches: boolean = await argon.verify(exUser.password, password);

    if (!passwordMatches) {
      throw new BadRequestException(NOT_MATCHED);
    }

    return { userId: exUser.id };
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
