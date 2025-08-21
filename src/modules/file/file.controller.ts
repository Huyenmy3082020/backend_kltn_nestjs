import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { Public } from 'src/decorator/public.decorator';
import { ErrorResponse } from 'src/base/common.response';
import { UploadFileUrlResponse } from './file.dto';

@ApiTags('file')
@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload-url')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create upload URL for file uploads',
    type: UploadFileUrlResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    type: ErrorResponse,
  })
  @ApiOperation({
    operationId: 'createUploadUrl',
    description: 'Create upload URL for file uploads',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.fileService.uploadFile(file);
    return result;
  }
}
