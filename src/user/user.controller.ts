import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserPayload } from '../common/types/user-payload.interface';
import { GetLikedMusicResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('liked')
  @Auth()
  @ApiOperation({ summary: '유저가 좋아요한 노래들을 가져옵니다.' })
  @ApiOkResponse({ description: '유저가 좋아요한 모든 노래를 가져왔습니다.', type: GetLikedMusicResponseDto })
  @ApiBadRequestResponse({ description: '존재하지 않는 유저입니다.' })
  async getAllLikedMusics(@CurrentUser() { userId }: UserPayload) {
    return await this.userService.getAllLikedMusics(userId);
  }
}
