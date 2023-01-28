import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadMusicRequestDto } from './dtos/song-request.dto';

@Injectable()
export class SongRepository {
  constructor(private readonly prisma: PrismaService) {}

  async uploadMusic(userId: number, uploadMusicRequestDto: UploadMusicRequestDto, fileUrl: string) {
    return await this.prisma.song.create({
      data: {
        ...uploadMusicRequestDto,
        fileUrl,
        UserId: userId,
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
}
