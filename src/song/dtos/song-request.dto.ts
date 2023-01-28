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

  @IsString()
  @IsOptional()
  AlbumId?: number;
}

export class AddToPlaylistRequestDto {
  @IsNumber()
  playlistId: number;

  @IsNumber()
  songId: number;
}
