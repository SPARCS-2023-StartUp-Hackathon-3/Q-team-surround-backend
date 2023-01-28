import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { RedisConfig } from './cache/redis.config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { SongModule } from './song/song.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthModule,
    FileModule,
    UserModule,
    SongModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
