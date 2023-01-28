import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './playlist.repository';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository],
  exports: [PlaylistRepository],
})
export class PlaylistModule {}
