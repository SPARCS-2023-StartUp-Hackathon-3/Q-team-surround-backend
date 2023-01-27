import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/user-request.dto';
import { CreateUserResponseDto, FindUserResponseDto } from './dto/user-response.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserRequestDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return await this.userRepository.createUser(createUserRequestDto);
  }

  async findUserByEmail(email: string): Promise<FindUserResponseDto> {
    return await this.userRepository.findUniqueUser(email);
  }
}
