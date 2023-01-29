import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedRequestDto } from './dtos/feed-request.dto';

@Injectable()
export class FeedRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createFeed(userId: number, createFeedRequestDto: CreateFeedRequestDto) {
    const { content, songId } = createFeedRequestDto;
    console.log(songId);
    if (songId) {
      return await this.prisma.feed.create({
        data: {
          content,
          UserId: userId,
          Song: {
            connect: {
              id: songId,
            },
          },
        },
        include: {
          Song: true,
        },
      });
    } else {
      return await this.prisma.feed.create({
        data: {
          content,
          UserId: userId,
        },
      });
    }
  }

  async findFeeds(userId: number) {
    return await this.prisma.feed.findMany({
      where: {
        UserId: userId,
      },
      include: {
        Song: true,
      },
    });
  }
}
