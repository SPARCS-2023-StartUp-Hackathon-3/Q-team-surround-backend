import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFeedRequestDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  songId?: number;
}
