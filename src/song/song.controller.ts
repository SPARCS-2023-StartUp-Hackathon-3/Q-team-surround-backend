import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Song } from '@prisma/client';
import { Auth } from '../auth/auth.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserPayload } from '../common/types/user-payload.interface';
import { AddToPlaylistRequestDto, LikeMusicRequestDto, UploadMusicRequestDto } from './dtos/song-request.dto';
import { LikeMusicResponseDto, SongResponseDto } from './dtos/song-response.dto';
import { SongService } from './song.service';

@ApiTags('Song')
@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post('upload')
  @Auth()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'song' }, { name: 'cover' }]))
  @ApiOperation({ summary: '음악을 업로드합니다.' })
  @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       title: { type: 'string' },
  //       description: { type: 'integer', nullable: true },
  //       genre: { type: 'string' },
  //       AlbumId: { type: 'integer' },
  //       song: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  @ApiCreatedResponse({
    description: '정상적으로 업로드가 완료되었습니다. 업로드에 시간이 좀 걸립니다.',
    type: SongResponseDto,
  })
  async uploadMusic(
    @UploadedFiles() files: Express.MulterS3.File[],
    @Body() uploadMusicRequestDto: UploadMusicRequestDto,
    @CurrentUser() { userId }: UserPayload,
  ): Promise<Song> {
    const song = files['song'][0];
    const cover = files['cover'][0];
    return await this.songService.uploadMusic(userId, uploadMusicRequestDto, song, cover);
  }

  @Get('download')
  @Auth()
  @ApiOperation({ summary: '음악을 다운로드합니다.' })
  @ApiQuery({ description: '음원 제목을 쿼리스트링으로 넣어주세요.' })
  @ApiOkResponse({ description: '음원을 스트림으로 전달합니다.' })
  async streamingSong(@Query('title') title: string) {
    return await this.songService.streamingSong(title);
  }

  @Get('info')
  @Auth()
  @ApiOperation({ summary: '해당 음원의 세부정보를 불러옵니다.' })
  @ApiOkResponse({ description: '해당 음원의 상세한 정보를 가져옵니다.' })
  @ApiNotFoundResponse({ description: '해당 음원이 존재하지 않습니다.' })
  async getMusicInfo(@Query('songId') musicId: number) {
    return await this.songService.getMusicInfo(musicId);
  }

  // @Post('playlist')
  // @Auth()
  // async addToPlaylist(@Body() addToPlaylistRequestDto: AddToPlaylistRequestDto) {
  //   return await this.songService.addToPlaylist(addToPlaylistRequestDto);
  // }

  @Post('like')
  @Auth()
  @ApiOperation({ summary: '해당 음악에 좋아요를 누릅니다.' })
  @ApiCreatedResponse({
    description: '좋아요에 성공하여, 유저의 좋아요 목록과 해당 게시물을 좋아요 한 유저를 전달합니다.',
    type: LikeMusicResponseDto,
  })
  async likeMusic(@CurrentUser() { userId }: UserPayload, @Body() likeMusicReqeustDto: LikeMusicRequestDto) {
    return await this.songService.likeMusic(userId, likeMusicReqeustDto);
  }
}
