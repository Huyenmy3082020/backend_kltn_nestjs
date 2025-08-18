import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserModule } from '../users/user.module';
import { Permission } from '../permissions/permision.entity';
import { AuthGuard } from './auth.guard';
import { FirebaseAdminService } from './firebase-admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission]), UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, FirebaseAdminService],
  exports: [AuthService, AuthGuard, FirebaseAdminService],
})
export class AuthModule {}
