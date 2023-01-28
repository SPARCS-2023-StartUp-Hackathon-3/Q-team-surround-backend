import { BadRequestException, Injectable, StreamableFile } from '@nestjs/common';
import { FILE_NOT_EXIST } from '../common/consts/exception-messages.const';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}
  s3 = new AWS.S3({
    region: this.configService.get('AWS_BUCKET_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });
  AWS_BUCKET_NAME = this.configService.get<string>('AWS_BUCKET_NAME');

  async uploadSong(song: Express.MulterS3.File, title: string) {
    if (!song) {
      throw new BadRequestException(FILE_NOT_EXIST);
    }

    const ext = song.originalname.split('.').at(-1);
    const savingName = title + '.' + ext;
    const param = {
      Bucket: this.AWS_BUCKET_NAME,
      Key: 'songs/' + savingName,
      Body: song.buffer,
    };
    await this.s3.upload(param).promise();
    return { filePath: '/songs/' + title };
  }

  async downloadSong(song: string) {
    const param = {
      Bucket: this.AWS_BUCKET_NAME,
      Key: 'songs/' + song + '.mp3',
    };

    const stream = this.s3.getObject(param).createReadStream();

    return new StreamableFile(stream);
  }
}
