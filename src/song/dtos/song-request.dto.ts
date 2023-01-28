import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UploadMusicRequestDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsEnum(Genre)
  genre: Genre;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  AlbumId?: number;
}

export class AddToPlaylistRequestDto {
  @ApiProperty()
  @IsNumber()
  playlistId: number;

  @ApiProperty()
  @IsNumber()
  songId: number;
}

export class LikeMusicRequestDto {
  @ApiProperty()
  @IsNumber()
  songId: number;
}
