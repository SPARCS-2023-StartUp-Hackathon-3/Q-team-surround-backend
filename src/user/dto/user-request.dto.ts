import { IsEmail, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;
}
