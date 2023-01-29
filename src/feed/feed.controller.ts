import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserPayload } from '../common/types/user-payload.interface';
import { CreateFeedRequestDto } from './dtos/feed-request.dto';
import { FeedService } from './feed.service';

@ApiTags('Feed')
@Controller('feeds')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: '피드를 생성합니다.' })
  @ApiBody({ description: '피드 작성 내용과, 선택적으로 음악을 id로 넣습니다.', type: CreateFeedRequestDto })
  async createFeed(@CurrentUser() { userId }: UserPayload, @Body() createFeedRequestDto: CreateFeedRequestDto) {
    return await this.feedService.createFeed(userId, createFeedRequestDto);
  }

  // @Get()
  // getAll;
}
