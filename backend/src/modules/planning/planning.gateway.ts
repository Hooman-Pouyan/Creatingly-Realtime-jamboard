import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins (for development purposes only, change this in production)
    methods: ['GET', 'POST'],
  },
})
export class PlanningGateWay implements OnModuleInit {
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connected', socket.id);
    });
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('planning')
  handleUpdateElementPosition(@MessageBody() data: any): void {
    console.log('Element position updated:', data);
    this.server.emit('planning', data); // Broadcast to all connected clients
  }

  @SubscribeMessage('cursorMoved')
  handleCursorMoved(@MessageBody() data: any): void {
    console.log('Cursor moved:', data);
    this.server.emit('cursorUpdated', data); // Broadcast to all connected clients
  }
}
