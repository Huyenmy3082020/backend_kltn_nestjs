import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as admin from 'firebase-admin';
@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private onlineUsers: Record<string, string> = {}; // userId -> socketId

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token || client.handshake.query?.token;
    if (!token) {
      console.log('No token provided, disconnecting', client.id);
      client.disconnect();
      return;
    }

    try {
      // Xác thực Firebase token
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;
      this.onlineUsers[uid] = client.id;
      console.log(`User ${uid} connected with socket ${client.id}`);
    } catch (err) {
      console.log('Invalid token, disconnecting', client.id);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, id] of Object.entries(this.onlineUsers)) {
      if (id === client.id) delete this.onlineUsers[userId];
    }
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(client: Socket, userId: string) {
    this.onlineUsers[userId] = client.id;
    console.log(`User ${userId} subscribed`);
  }

  sendNotification(userId: string, data: any) {
    const socketId = this.onlineUsers[userId];
    if (socketId) {
      this.server.to(socketId).emit('notification', data);
    }
  }
  // ✅ Thêm method này để gửi cho tất cả user đã subscribe
  broadcastNotification(data: any) {
    for (const socketId of Object.values(this.onlineUsers)) {
      this.server.to(socketId).emit('notification', data);
    }
  }
}
