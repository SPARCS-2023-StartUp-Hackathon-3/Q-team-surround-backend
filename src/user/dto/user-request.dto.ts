import { Provider } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Provider)
  provider: Provider;

  @IsString()
  nickname: string;
}
