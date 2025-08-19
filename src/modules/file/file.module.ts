import { Module } from '@nestjs/common';
import { FilesController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [],
  controllers: [FilesController],
  providers: [FileService],
})
export class FileModule {}
