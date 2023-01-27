import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRequestDto } from './dto/user-request.dto';
import { CreateUserResponseDto, FindUserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return await this.prisma.user.create({
      data: { ...createUserDto },
      select: { id: true },
    });
  }

  async findUniqueUser(email: string): Promise<FindUserResponseDto> {
    return await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });
  }
}
