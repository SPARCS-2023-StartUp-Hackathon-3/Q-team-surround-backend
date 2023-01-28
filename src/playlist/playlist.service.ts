import { Injectable } from '@nestjs/common';
import { CreatePlaylistRequestDto } from './dtos/playlist-request.dto';
import { PlaylistRepository } from './playlist.repository';

@Injectable()
export class PlaylistService {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  async getPlaylist(userId: number, playlistId: number) {
    return await this.playlistRepository.getPlaylist(userId, playlistId);
  }

  async createPlaylist(userId: number, createPlaylistRequestDto: CreatePlaylistRequestDto) {
    return await this.playlistRepository.createPlaylist(userId, createPlaylistRequestDto);
  }
}
