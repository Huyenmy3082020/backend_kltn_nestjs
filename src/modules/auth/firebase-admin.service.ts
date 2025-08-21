import * as admin from 'firebase-admin';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FirebaseAdminService {
  private defaultApp: admin.app.App;
  private readonly logger = new Logger(FirebaseAdminService.name);

  constructor() {
    try {
      const serviceAccount = {
        projectId: 'test-628d4',
        clientEmail:
          'firebase-adminsdk-fbsvc@test-628d4.iam.gserviceaccount.com',
        privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDpIyixlqRxa+Vc
H+At9r3WJc8uMc4elDXq1ztxYLdOJhBUJJYz9jiqZ59uJucfjuycNvcydvPrWuQ2
rBek7KaL4boMvytelADTrgUXnGCHgG8Qff75UZYj+0lFq5Hpn2lIMumEhkIY7JE7
FHifaXSUePgqJPHDymA8oq0Nwssi6+bSFjgcn7XMvijXve5Cq2Vhmhu27XpKLYsI
9DHBHFU7OyxrQwulgXMQEtSpj5AqxHI0GBleaZ1duGNTDeGZ0zLKPPmeCA13Xzwq
hxlYDxoqmIbS/SHuwjHvOI8Uhd1QsgvSpEMfNv/htVOlWaBjJEruc/QrdO52Bri6
658WA1Z5AgMBAAECggEAASyGJe7GQTPz4bTfYhvd9NgX5PmnOgwxAU+4IugDxEb4
yhOtFfHlcyY2bU2Q2F3V3yt/rydeLw80Gvpe3Bu88vNeBnZn93/zSR2VNPs6mTQS
WxjnUcYRZXj8c3dbsrt0wkJPXrV2W73FNXDy8oqLZbv+M+gft4arWWLQUENs1m4r
MvsfsTLh98QtYDWOyVOJA4kVJVbt/rWzE2n88rj579bTv7YMaDAxTsuVMIJhOV5C
lvkKZ8UnqBjj6uYzv7g5VBGgXxOwjatf3XsDbpitYft8RaFn1rc89guN2y8BdxpN
+cXanz+UondU5cUnYI60jwtYKIIkprHAyp0o0L/1IQKBgQD+wZoFW00iSvJ96Yao
sxzZpG435tpeJW+/10BiGEVehESfd3I+ziSvHJgs+inwUEn31X41wcXuoCJ7E37b
RvtBjQwirKXVDcbpJOi1tbS5b07hfBnNc8mnGUfC6mfobvDowLx3qj9c3Ius9xc5
JQTG+Fb3M5Sk6oxWJQhrYVZjfQKBgQDqRomjw/rJTnunhxd4Ey+ju4uOJuah2oFz
cgpqQn+RO8z6sUH4GZzEvHw355Xtn+vFb/RcAEcJTwDzRawALaDTiHlrV7x+ulRr
LtP7/EGR3kyNM3QIXKgdO/Dfwwxi9I0Zs2UpPoHP+lQJH3rrWG9UDwM7JKLg8ZCB
VMMQF193rQKBgQDwO88rZ/qn8PcVB2eFpEn7bxTEwHyBtVnZFXnQR0T7KU2w9ymT
0j9DpnpWR53O0Ve/TuMSfGVTbky1tR+2VgxPt1uPQzGqZLCDYNvVpsEC8NT4y1dl
p9+sJKnIQ9WymROy2TWgvrm7rvpEJEoRCDimDL+to0Vz8v5dqdRztjmJ3QKBgHRC
mw2NNUhvTUge71OkWdDsQl5CCdQqhnFPF8IRzBK71YZXLwC7XSP40cBAihPJeAyb
+W0qqhYBgdw4KBpSimxPXsoZWS6es0QZkhOL5NJJuj2cWinIKZmQZIH23o/BAsDN
WRd1sKAQf2GjoLFoSp8xcA4KqVXuKyMzeDXlE3hlAoGAfZb6bt3qladlULnMad3c
1ECRe0adwd1ZmLyhvYRkssBN72rV5zVclsLGyiuIe00AgnKLe0nVz6bcNoSGh7VZ
dubz7Z4C0rtZExSMc246m5wLQlgQnAdrg5bArQcPKBjMgE5QopULWh+T0/muDfw+
vlS6gk1QG1h0fNbv6X51BEw=
-----END PRIVATE KEY-----`,
      };

      this.defaultApp = admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
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
