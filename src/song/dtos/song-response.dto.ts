import { Genre } from '@prisma/client';

export class SongResponseDto {
  id: 8;
  title: string;
  description: string;
  genre: Genre;
  lyrics?: string;
  fileUrl: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  UserId: number;
  AlbumId: boolean;
}
