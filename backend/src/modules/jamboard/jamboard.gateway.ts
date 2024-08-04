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

  @SubscribeMessage(SocketEvents.JAMBOARD.STATE)
  handleStateUpdate(@MessageBody() body: any) {
    // this.server.emit(SocketEvents.JAMBOARD.STATE, body);
    this.jamboardService.handleStateUpdate(body);
  }

  @SubscribeMessage(SocketEvents.JAMBOARD.ELEMENT.SIZE)
  handleElementSizeChange(@MessageBody() body: any) {
    this.server.emit(SocketEvents.JAMBOARD.ELEMENT.SIZE, body);
    // this.jamboardService.handleElementSizeChange(body);
  }

  @SubscribeMessage(SocketEvents.JAMBOARD.ELEMENT.POSITION)
  handleElementPositionChange(@MessageBody() body: any) {
    this.server.emit(SocketEvents.JAMBOARD.ELEMENT.POSITION, {
      id: body[0],
      event: SocketEvents.JAMBOARD.ELEMENT.POSITION,
      data: body[1],
    });
    // console.log(body);
    // this.jamboardService.handleElementPositionChange(body);
  }

  @SubscribeMessage(SocketEvents.JAMBOARD.ELEMENT.APPEARANCE)
  handleElementAppearanceChange(@MessageBody() body: any) {
    this.server.emit(SocketEvents.JAMBOARD.ELEMENT.APPEARANCE, body);
    this.jamboardService.handleElementAppearanceChange(body);
  }

  @SubscribeMessage(SocketEvents.JAMBOARD.ELEMENT.DATA)
  handleElementDataChange(@MessageBody() body: any) {
    this.server.emit(SocketEvents.JAMBOARD.ELEMENT.DATA, body);
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

  @SubscribeMessage(SocketEvents.JAMBOARD.USERS.ACTIVE)
  handleActiveUsers(@MessageBody() body: any) {
    this.server.emit(SocketEvents.JAMBOARD.USERS.ACTIVE, body);
    this.jamboardService.handleActiveUsers(body);
  }
}
