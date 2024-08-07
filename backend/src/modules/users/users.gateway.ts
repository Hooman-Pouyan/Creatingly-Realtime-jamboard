import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
// import { SocketEvents } from 'src/core/models/events.model';
import { UsersService } from './users.service';
import { SocketEvents } from 'src/core/models/events.model';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins (for development purposes only, change this in production)
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
  },
})
export class UsersGateWay implements OnModuleInit {
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connected', socket.id);
    });
  }
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly usersService: UsersService,
    // private compressionService: CompressionService,
  ) {}

  @SubscribeMessage(SocketEvents.JAMBOARD.USERS$)
  handleStateUpdate(@MessageBody() body: any) {
    console.log(body);
    this.server.emit(SocketEvents.JAMBOARD.USERS$, {
      event: SocketEvents.JAMBOARD.USERS$,
      id: body[0],
      type: body[1],
      data: body[2],
    });
    // this.usersService.handleStateUpdate(body);
  }

  // @SubscribeMessage(SocketEvents.JAMBOARD.USERS.LOGOUT)
  // handleElementSizeChange(@MessageBody() body: any) {
  //   console.log(body);
  //   this.server.emit(SocketEvents.JAMBOARD.USERS.LOGOUT, {
  //     event: SocketEvents.JAMBOARD.USERS.LOGOUT,
  //     id: body[0],
  //     type: body[1],
  //     data: body[2],
  //   });
  //   // this.jamboardService.handleElementSizeChange(body);
  // }

  // @SubscribeMessage(SocketEvents.JAMBOARD.USERS.UPDATE)
  // handleElementPositionChange(@MessageBody() body: any) {
  //   this.server.emit(SocketEvents.JAMBOARD.USERS.UPDATE, {
  //     event: SocketEvents.JAMBOARD.USERS.UPDATE,
  //     id: body[0],
  //     type: body[1],
  //     data: body[2],
  //   });
  // }
  // console.log(body);
  // this.usersService.handleElementPositionChange(body);
}
