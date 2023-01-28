import { forwardRef, Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { SongRepository } from './song.repository';
import { FileModule } from '../file/file.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [FileModule, forwardRef(() => UserModule)],
  controllers: [SongController],
  providers: [SongService, SongRepository],
  exports: [SongRepository],
})
export class SongModule {}
