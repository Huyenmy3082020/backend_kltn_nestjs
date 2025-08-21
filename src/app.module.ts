import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/users/user.module';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { FirebaseAdminService } from './modules/auth/firebase-admin.service';
import { FileModule } from './modules/file/file.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // thư mục public
      serveRoot: '/', // URL root
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ProductModule,
    FileModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Nest sẽ inject đầy đủ dependencies
    },
  ],
})
export class AppModule {}
