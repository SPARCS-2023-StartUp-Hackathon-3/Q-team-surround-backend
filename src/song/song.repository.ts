import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../user/user.repository';
import { UploadMusicRequestDto } from './dtos/song-request.dto';

@Injectable()
export class SongRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => UserRepository)) private readonly userRepository: UserRepository,
  ) {}

  async uploadMusic(
    userId: number,
    uploadMusicRequestDto: UploadMusicRequestDto,
    fileUrl: string,
    imageLocation: string,
  ) {
    return await this.prisma.song.create({
      data: {
        ...uploadMusicRequestDto,
        fileUrl,
        UserId: userId,
        coverImageUrl: imageLocation,
      },
    });
  }

  async findMusicByTitle(title: string) {
    return await this.prisma.song.findFirst({
      where: {
        title,
      },
    });
  }

  async findMusicInfoById(musicId: number) {
    return await this.prisma.song.findUnique({
      where: {
        id: musicId,
      },
    });
  }

  async updateLiker(userId: number, songId: number) {
    try {
      return await this.prisma.song.update({
        where: { id: songId },
        data: {
          Liker: {
            connect: {
              id: userId,
            },
          },
        },
        select: {
          Liker: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('유저 혹은 음원이 존재하지 않습니다.');
    }
  }
}
