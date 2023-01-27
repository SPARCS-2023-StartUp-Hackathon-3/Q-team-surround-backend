import { IsEmail, IsString } from 'class-validator';

export class SignupRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
