import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { FeedRepository } from './feed.repository';
import { SongModule } from '../song/song.module';

@Module({
  imports: [SongModule],
  controllers: [FeedController],
  providers: [FeedService, FeedRepository],
  exports: [FeedRepository],
})
export class FeedModule {}
