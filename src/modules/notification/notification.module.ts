// src/modules/notification/notification.module.ts
import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationGateway, NotificationService],
  exports: [NotificationGateway],
})
export class NotificationModule {}
