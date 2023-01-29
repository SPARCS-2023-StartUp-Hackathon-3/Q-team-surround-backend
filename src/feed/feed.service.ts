import { Injectable } from '@nestjs/common';
import { CreateFeedRequestDto } from './dtos/feed-request.dto';
import { FeedRepository } from './feed.repository';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}

  async createFeed(userId: number, createFeedRequestDto: CreateFeedRequestDto) {
    return await this.feedRepository.createFeed(userId, createFeedRequestDto);
  }

  async getAllFeed(userId: number) {
    return await this.feedRepository.findFeeds(userId);
  }
}
