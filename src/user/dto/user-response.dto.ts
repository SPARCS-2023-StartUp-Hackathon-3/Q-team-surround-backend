import { IsNumber, IsString } from 'class-validator';

export class CreateUserResponseDto {
  @IsNumber()
  id: number;
}

export class FindUserResponseDto {
  @IsString()
  id: number;

  @IsString()
  password: string;
}
