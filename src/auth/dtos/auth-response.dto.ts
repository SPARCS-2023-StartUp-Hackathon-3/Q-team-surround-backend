import { IsNumber, IsString } from 'class-validator';

export class SignupResponseDto {
  @IsString()
  accessToken: string;

  @IsNumber()
  userId: number;
}
