import { IsEmail, IsString } from 'class-validator';

export class SignupRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;
}
