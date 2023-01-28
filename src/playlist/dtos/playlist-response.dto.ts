import { ApiProperty } from '@nestjs/swagger';
import { Song } from '@prisma/client';

export class CreatePlaylistResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  UserId: number;

  @ApiProperty()
  Song: Song[];
}
