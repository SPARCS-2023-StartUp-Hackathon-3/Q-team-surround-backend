import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePlaylistRequestDto {
  @IsString()
  title: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
