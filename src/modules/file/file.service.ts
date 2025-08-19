import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { Express } from 'express';

@Injectable()
export class FileService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );

  async uploadFile(file: Express.Multer.File) {
    const filePath = `uploads/${Date.now()}-${file.originalname}`;

    const { data, error } = await this.supabase.storage
      .from('documents')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      // Convert thành HttpException chuẩn
      throw new HttpException(
        error.message || 'Upload failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      path: filePath,
      data,
      publicUrl: this.getPublicUrl(filePath),
    };
  }

  getPublicUrl(path: string) {
    const { data } = this.supabase.storage.from('documents').getPublicUrl(path);
    return data.publicUrl;
  }
}
