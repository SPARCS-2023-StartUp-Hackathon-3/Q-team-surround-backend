import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlaylistRequestDto } from './dtos/playlist-request.dto';
import { CreatePlaylistResponseDto } from './dtos/playlist-response.dto';

@Injectable()
export class PlaylistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getPlaylist(userId: number, playlistId: number) {
    return await this.prisma.playlist.findFirst({
      where: {
        id: playlistId,
        UserId: userId,
      },
    });
  }

  async createPlaylist(
    userId: number,
    createPlaylistRequestDto: CreatePlaylistRequestDto,
  ): Promise<CreatePlaylistResponseDto> {
    return await this.prisma.playlist.create({
      data: {
        ...createPlaylistRequestDto,
        UserId: userId,
      },
      include: {
        Song: true,
      },
    });
  }
}
