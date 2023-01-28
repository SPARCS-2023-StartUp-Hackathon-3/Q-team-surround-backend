import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadSongResponseDto {
  @ApiProperty()
  @IsString()
  filePath: string;
}
