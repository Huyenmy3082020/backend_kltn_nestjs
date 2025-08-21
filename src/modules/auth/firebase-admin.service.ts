import * as admin from 'firebase-admin';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FirebaseAdminService {
  private defaultApp: admin.app.App;
  private readonly logger = new Logger(FirebaseAdminService.name);

  constructor() {
    try {
      this.defaultApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: 'test-628d4',
          clientEmail:
            'firebase-adminsdk-fbsvc@test-628d4.iam.gserviceaccount.com',
          privateKey:
            '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDpIyixlqRxa+Vc\nH+At9r3WJc8uMc4elDXq1ztxYLdOJhBUJJYz9jiqZ59uJucfjuycNvcydvPrWuQ2\nrBek7KaL4boMvytelADTrgUXnGCHgG8Qff75UZYj+0lFq5Hpn2lIMumEhkIY7JE7\nFHifaXSUePgqJPHDymA8oq0Nwssi6+bSFjgcn7XMvijXve5Cq2Vhmhu27XpKLYsI\n9DHBHFU7OyxrQwulgXMQEtSpj5AqxHI0GBleaZ1duGNTDeGZ0zLKPPmeCA13Xzwq\nhxlYDxoqmIbS/SHuwjHvOI8Uhd1QsgvSpEMfNv/htVOlWaBjJEruc/QrdO52Bri6\n658WA1Z5AgMBAAECggEAASyGJe7GQTPz4bTfYhvd9NgX5PmnOgwxAU+4IugDxEb4\nyhOtFfHlcyY2bU2Q2F3V3yt/rydeLw80Gvpe3Bu88vNeBnZn93/zSR2VNPs6mTQS\nWxjnUcYRZXj8c3dbsrt0wkJPXrV2W73FNXDy8oqLZbv+M+gft4arWWLQUENs1m4r\nMvsfsTLh98QtYDWOyVOJA4kVJVbt/rWzE2n88rj579bTv7YMaDAxTsuVMIJhOV5C\nlvkKZ8UnqBjj6uYzv7g5VBGgXxOwjatf3XsDbpitYft8RaFn1rc89guN2y8BdxpN\n+cXanz+UondU5cUnYI60jwtYKIIkprHAyp0o0L/1IQKBgQD+wZoFW00iSvJ96Yao\nsxzZpG435tpeJW+/10BiGEVehESfd3I+ziSvHJgs+inwUEn31X41wcXuoCJ7E37b\nRvtBjQwirKXVDcbpJOi1tbS5b07hfBnNc8mnGUfC6mfobvDowLx3qj9c3Ius9xc5\nJQTG+Fb3M5Sk6oxWJQhrYVZjfQKBgQDqRomjw/rJTnunhxd4Ey+ju4uOJuah2oFz\ncgpqQn+RO8z6sUH4GZzEvHw355Xtn+vFb/RcAEcJTwDzRawALaDTiHlrV7x+ulRr\nLtP7/EGR3kyNM3QIXKgdO/Dfwwxi9I0Zs2UpPoHP+lQJH3rrWG9UDwM7JKLg8ZCB\nVMMQF193rQKBgQDwO88rZ/qn8PcVB2eFpEn7bxTEwHyBtVnZFXnQR0T7KU2w9ymT\n0j9DpnpWR53O0Ve/TuMSfGVTbky1tR+2VgxPt1uPQzGqZLCDYNvVpsEC8NT4y1dl\np9+sJKnIQ9WymROy2TWgvrm7rvpEJEoRCDimDL+to0Vz8v5dqdRztjmJ3QKBgHRC\nmw2NNUhvTUge71OkWdDsQl5CCdQqhnFPF8IRzBK71YZXLwC7XSP40cBAihPJeAyb\n+W0qqhYBgdw4KBpSimxPXsoZWS6es0QZkhOL5NJJuj2cWinIKZmQZIH23o/BAsDN\nWRd1sKAQf2GjoLFoSp8xcA4KqVXuKyMzeDXlE3hlAoGAfZb6bt3qladlULnMad3c\n1ECRe0adwd1ZmLyhvYRkssBN72rV5zVclsLGyiuIe00AgnKLe0nVz6bcNoSGh7VZ\ndubz7Z4C0rtZExSMc246m5wLQlgQnAdrg5bArQcPKBjMgE5QopULWh+T0/muDfw+\nvlS6gk1QG1h0fNbv6X51BEw=\n-----END PRIVATE KEY-----\n',
        }),
      });

      this.logger.log('✅ Firebase Admin initialized');
    } catch (error) {
      this.logger.error('❌ Error initializing Firebase Admin:', error);
    }
  }

  getAuth() {
    return this.defaultApp.auth();
  }
}
