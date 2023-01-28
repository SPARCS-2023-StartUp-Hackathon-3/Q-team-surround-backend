import { ApiProperty } from '@nestjs/swagger';
import { Genre, Provider } from '@prisma/client';

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

export class LikerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  password: string | null;

  @ApiProperty()
  provider: Provider;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class LikedSongDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  genre: Genre;

  @ApiProperty()
  lyrics: string | null;

  @ApiProperty()
  fileUrl: string;

  @ApiProperty()
  likes: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  UserId: number;

  @ApiProperty()
  AlbumId: number | null;
}

export class LikeMusicResponseDto {
  @ApiProperty({ type: LikerDto, isArray: true })
  Liker: LikerDto[];

  @ApiProperty({ type: LikedSongDto, isArray: true })
  LikedSong: LikedSongDto[];
}
