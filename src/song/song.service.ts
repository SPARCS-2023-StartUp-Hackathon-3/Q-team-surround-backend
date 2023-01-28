import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';
import { UploadMusicRequestDto } from './dtos/song-request.dto';
import { SongRepository } from './song.repository';

@Injectable()
export class SongService {
  constructor(private readonly songRepository: SongRepository, private readonly fileService: FileService) {}

  async uploadMusic(userId: number, uploadMusicRequestDto: UploadMusicRequestDto, song: Express.MulterS3.File) {
    // const exMusic = await this.songRepository.findMusic(fileUrl);

    // if (exMusic) {
    //   throw new BadRequestException('이미 존재하는 음악입니다.');
    // }
    const { filePath } = await this.fileService.uploadSong(song);
    const newMusic = await this.songRepository.uploadMusic(userId, uploadMusicRequestDto, filePath);

    return newMusic;
  }
}
