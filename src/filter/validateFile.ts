import { HttpException, HttpStatus } from '@nestjs/common';
import { AllowedFileTypes } from 'src/modules/file/file.dto';

export const validateFile = (file: Express.Multer.File) => {
  const allowedTypes: string[] = Object.values(AllowedFileTypes);

  if (!allowedTypes.includes(file.mimetype)) {
    throw new HttpException(
      `File không hợp lệ. Chỉ cho phép: ${allowedTypes.join(', ')}`,
      HttpStatus.BAD_REQUEST,
    );
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new HttpException(
      'File quá lớn. Kích thước tối đa là 5MB.',
      HttpStatus.BAD_REQUEST,
    );
  }
};
