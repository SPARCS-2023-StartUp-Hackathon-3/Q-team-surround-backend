import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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
