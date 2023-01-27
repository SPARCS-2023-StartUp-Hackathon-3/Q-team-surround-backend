import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ALREADY_EXISTS_USER, INVALID_REQUEST } from '../common/consts/exception-messages.const';
import { CreateUserResponseDto } from '../user/dto/user-response.dto';
import { UserService } from '../user/user.service';
import { SignupRequestDto } from './dtos/auth-request.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(signupRequestDto: SignupRequestDto) {
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
}
