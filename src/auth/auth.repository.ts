import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../cache/redis.service';
import { EXPIRATION } from '../common/consts/token.const';

@Injectable()
export class AuthRepository {
  constructor(private readonly redis: RedisCacheService) {}

  async setRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.redis.set(String(userId), refreshToken, EXPIRATION.REFRESH_TOKEN);
  }

  async delRefreshToken(userId: number): Promise<void> {
    await this.redis.del(String(userId));
  }
}
