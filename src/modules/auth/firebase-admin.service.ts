import * as admin from 'firebase-admin';
import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class FirebaseAdminService {
  private defaultApp: admin.app.App;
  private readonly logger = new Logger(FirebaseAdminService.name);

  constructor() {
    try {
      const serviceAccountRaw = readFileSync(
        'src/cert/serviceAccountKey.json',
        'utf-8',
      );

      const serviceAccount = JSON.parse(serviceAccountRaw);

      this.defaultApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      this.logger.error('Error initializing Firebase Admin:', error);
    }
  }

  getAuth() {
    return this.defaultApp.auth();
  }
}
