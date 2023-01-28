import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { LikedSongDto } from '../../song/dtos/song-response.dto';

export class CreateUserResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class FindUserResponseDto {
  @ApiProperty()
  @IsString()
  id: number;

  @ApiProperty()
  @IsString()
  password: string;
}

export class GetLikedMusicResponseDto {
  @ApiProperty({ type: LikedSongDto, isArray: true })
  LikedSong: LikedSongDto[];
}
