import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(private gateway: NotificationGateway) {}

  // Gửi cho 1 user
  notifyUser(userId: string, message: string) {
    // Có thể lưu DB ở đây nếu muốn
    this.gateway.sendNotification(userId, { message, timestamp: new Date() });
  }

  // Gửi cho tất cả user đã đăng ký
  broadcast(message: string) {
    this.gateway.broadcastNotification({ message, timestamp: new Date() });
  }
}
