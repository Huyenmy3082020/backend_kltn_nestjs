import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('notification')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // API gửi thông báo tới tất cả user đã đăng ký
  @Public()
  @Post('broadcast')
  broadcast(@Body('message') message: string) {
    this.notificationService.broadcast(message);
    return { status: 'ok', message };
  }

  // API gửi riêng cho 1 user
  @Post('send-to-user')
  sendToUser(@Body('userId') userId: string, @Body('message') message: string) {
    this.notificationService.notifyUser(userId, message);
    return { status: 'ok', userId, message };
  }
}
