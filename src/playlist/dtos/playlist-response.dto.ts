import { ApiProperty } from '@nestjs/swagger';
import { Song } from '@prisma/client';
import { SongResponseDto } from '../../song/dtos/song-response.dto';

export class CreatePlaylistResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  UserId: number;

  @ApiProperty({ type: SongResponseDto, isArray: true })
  Song: Song[];
}

export class GetPlaylistResponseDto extends CreatePlaylistResponseDto {}
