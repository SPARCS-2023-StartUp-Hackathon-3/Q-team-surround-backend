import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SignupResponseDto {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsNumber()
  userId: number;
}

export class SigninResponseDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
}

export class TokenResponseDto extends SignupResponseDto {}
