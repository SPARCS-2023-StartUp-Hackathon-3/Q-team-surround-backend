import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SongRepository } from '../song/song.repository';
import { CreateUserRequestDto } from './dto/user-request.dto';
import { CreateUserResponseDto, FindUserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => SongRepository)) private readonly songRepository: SongRepository,
  ) {}

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

  async findUserById(userId: number) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async updateLikedMusic(userId: number, songId: number) {
    try {
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          LikedSong: {
            connect: {
              id: songId,
            },
          },
        },
        select: {
          LikedSong: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('유저 혹은 음원이 존재하지 않습니다.');
    }
  }
}
