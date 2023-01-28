import { Injectable, NotFoundException } from '@nestjs/common';
import { FileService } from '../file/file.service';
import { AddToPlaylistRequestDto, UploadMusicRequestDto } from './dtos/song-request.dto';
import { SongRepository } from './song.repository';

@Injectable()
export class SongService {
  constructor(private readonly songRepository: SongRepository, private readonly fileService: FileService) {}

  async uploadMusic(userId: number, uploadMusicRequestDto: UploadMusicRequestDto, song: Express.MulterS3.File) {
    // const exMusic = await this.songRepository.findMusic(fileUrl);

    // if (exMusic) {
    //   throw new BadRequestException('이미 존재하는 음악입니다.');
    // }
    const { filePath } = await this.fileService.uploadSong(song, uploadMusicRequestDto.title);
    const newMusic = await this.songRepository.uploadMusic(userId, uploadMusicRequestDto, filePath);

    return newMusic;
  }

  async streamingSong(title: string) {
    const exMusic = await this.songRepository.findMusicByTitle(title);

    if (!exMusic) {
      throw new NotFoundException('해당 음원이 존재하지 않습니다.');
    }

    return await this.fileService.streamingSong(title);
  }

  async getMusicInfo(musicId: number) {
    const exMusic = await this.songRepository.findMusicInfoById(musicId);
    if (!exMusic) {
      throw new NotFoundException('해당 음원이 존재하지 않습니다.');
    }
    return exMusic;
  }

  async addToPlaylist(addToPlaylistRequestDto: AddToPlaylistRequestDto) {
    // const { playlistId, songId } = await this.songRepository.addToPlaylist;
  }
}
