import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEnum(Provider)
  provider: Provider;

  @ApiProperty()
  @IsString()
  nickname: string;
}
