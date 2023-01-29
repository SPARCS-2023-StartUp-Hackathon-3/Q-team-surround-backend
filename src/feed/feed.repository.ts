import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedRequestDto } from './dtos/feed-request.dto';

@Injectable()
export class FeedRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createFeed(userId: number, createFeedRequestDto: CreateFeedRequestDto) {
    const { content, songId } = createFeedRequestDto;
    try {
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
    } catch (err) {
      throw new BadRequestException('유효하지 않은 요청입니다.');
    }
  }

  async findFeeds(userId: number) {
    try {
      return await this.prisma.feed.findMany({
        where: {
          UserId: userId,
        },
        include: {
          Song: true,
        },
      });
    } catch (err) {
      throw new BadRequestException('유저 아이디를 확인해주세요.');
    }
  }
}
