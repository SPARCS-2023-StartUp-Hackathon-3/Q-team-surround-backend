import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class SigninRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class KakaoLoginRequestDto {
  @ApiProperty()
  @IsString()
  accessToken: string;
}
