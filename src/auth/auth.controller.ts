import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dtos/auth-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signuprequestDto: SignupRequestDto) {
    const user: Partial<User> = await this.authService.signup(signuprequestDto);

    // TODO 액세스 토큰 발급

    return user;
  }
}
