import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketEvents } from 'src/core/models/events.model';
import { JamboardService } from './jamboard.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins (for development purposes only, change this in production)
    methods: ['GET', 'POST'],
  },
})
export class JamboardGateWay implements OnModuleInit {
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connected', socket.id);
    });
  }
  @WebSocketServer()
  server: Server;

  constructor(private readonly jamboardService: JamboardService) {}

  @SubscribeMessage(SocketEvents.JAMBOARD.ELEMENT$)
  handleElementAppearanceChange(@MessageBody() body: any) {
    console.log(body);
    this.server.emit(SocketEvents.JAMBOARD.ELEMENT$, {
      event: SocketEvents.JAMBOARD.ELEMENT$,
      id: body[0],
      type: body[1],
      data: body[2],
    });
    // this.jamboardService.handleElementAppearanceChange(body);
  }

  @SubscribeMessage(SocketEvents.JAMBOARD.COMMENTS$)
  handleElementDataChange(@MessageBody() body: any) {
    console.log(body);

    this.server.emit(SocketEvents.JAMBOARD.COMMENTS$, {
      event: SocketEvents.JAMBOARD.COMMENTS$,
      id: body[0],
      type: body[1],
      data: body[2],
    });
    this.jamboardService.handleElementDataChange(body);
  }

  @SubscribeMessage(SocketEvents.JAMBOARD.ELEMENT.INFO)
  handleElementInfoChange(@MessageBody() body: any) {
    this.server.emit(SocketEvents.JAMBOARD.ELEMENT.INFO, body);
    this.jamboardService.handleElementInfoChange(body);
  }

  @SubscribeMessage(SocketEvents.JAMBOARD.CURSOR.MOVE)
  handleCursorMove(@MessageBody() body: any) {
    this.server.emit(SocketEvents.JAMBOARD.CURSOR.MOVE, body);
    this.jamboardService.handleCursorMove(body);
  }
}
