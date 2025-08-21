export class UploadFileUrlResponse {
  path: string;
  data: any;
  publicUrl: string;
}
export enum AllowedFileTypes {
  PDF = 'application/pdf',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  WEBP = 'image/webp',
}
