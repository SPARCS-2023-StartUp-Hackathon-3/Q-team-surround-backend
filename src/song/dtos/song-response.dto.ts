import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '@prisma/client';

export class SongResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  genre: Genre;

  @ApiProperty()
  lyrics?: string;

  @ApiProperty()
  fileUrl: string;

  @ApiProperty()
  views: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  UserId: number;

  @ApiProperty()
  AlbumId: boolean;
}
