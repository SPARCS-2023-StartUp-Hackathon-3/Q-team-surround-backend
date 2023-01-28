import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserPayload } from '../common/types/user-payload.interface';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('liked')
  @Auth()
  async getAllLikedMusics(@CurrentUser() { userId }: UserPayload) {
    return await this.userService.getAllLikedMusics(userId);
  }
}
