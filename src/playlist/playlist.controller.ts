import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Auth } from '../auth/auth.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserPayload } from '../common/types/user-payload.interface';
import { CreatePlaylistRequestDto } from './dtos/playlist-request.dto';
import { CreatePlaylistResponseDto } from './dtos/playlist-response.dto';
import { PlaylistService } from './playlist.service';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get(':playlistId')
  @Auth()
  @ApiOperation({ summary: '특정 플레이리스트를 가져옵니다.' })
  @ApiOkResponse({ description: '플레이리스트 조회에 성공했습니다.', type: Prisma.Prisma__PlaylistClient })
  async getPlaylist(@CurrentUser() { userId }: UserPayload, @Param('playlistId') playlistId: number) {
    return await this.playlistService.getPlaylist(userId, playlistId);
  }

  @Post()
  @Auth()
  @ApiOperation({ summary: '플레이리스트만 생성합니다.' })
  @ApiCreatedResponse({ description: '플레이리스트를 생성합니다.', type: CreatePlaylistResponseDto })
  @ApiBody({ description: '플레이리스트 제목, 외부 공개 여부', type: CreatePlaylistRequestDto })
  async createPlaylist(
    @CurrentUser() { userId }: UserPayload,
    @Body() createPlaylistRequestDto: CreatePlaylistRequestDto,
  ): Promise<CreatePlaylistResponseDto> {
    return await this.playlistService.createPlaylist(userId, createPlaylistRequestDto);
  }
}
