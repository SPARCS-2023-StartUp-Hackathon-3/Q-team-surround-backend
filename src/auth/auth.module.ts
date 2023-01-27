import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EXPIRATION } from '../common/consts/token.const';
import { AuthRepository } from './auth.repository';
import { RedisCacheModule } from '../cache/redis.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN'),
        signOptions: { expiresIn: EXPIRATION.ACCESS_TOKEN * 1000 },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RedisCacheModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
