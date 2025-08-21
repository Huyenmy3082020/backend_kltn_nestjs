import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { validateFile } from 'src/filter/validateFile';

@Injectable()
export class FileService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );

  async uploadFile(file: Express.Multer.File) {
    await validateFile(file);

    const filePath = `uploads/${Date.now()}-${file.originalname}`;

    const { data, error } = await this.supabase.storage
      .from('documents')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new HttpException(
        'UPLOAD_FAILED',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      susscess: true,
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
