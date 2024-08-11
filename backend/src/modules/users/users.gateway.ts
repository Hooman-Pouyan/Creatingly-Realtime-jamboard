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
      userId: body[0],
      id: body[1],
      type: body[2],
      data: body[3],
    });
    // this.usersService.handleStateUpdate(body);
  }


}
