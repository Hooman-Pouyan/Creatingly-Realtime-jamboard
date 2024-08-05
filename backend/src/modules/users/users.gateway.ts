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

  constructor(private readonly usersService: UsersService) {}

  @SubscribeMessage('jamboard:users:login')
  handleStateUpdate(@MessageBody() body: any) {
    console.log(body);
    // this.server.emit('jamboard:users:login', {
    //   event: 'jamboard:users:login',
    //   id: body[0],
    //   type: body[1],
    //   data: body[2],
    // });
    // this.usersService.handleStateUpdate(body);
  }

  // @SubscribeMessage(SocketEvents.JAMBOARD.USERS.LOGOUT)
  // handleElementSizeChange(@MessageBody() body: any) {
  //   this.server.emit(SocketEvents.JAMBOARD.USERS.LOGOUT, {
  //     id: body[0],
  //     event: SocketEvents.JAMBOARD.USERS.LOGOUT,
  //     data: body[1],
  //   });
  //   // this.jamboardService.handleElementSizeChange(body);
  // }

  // @SubscribeMessage(SocketEvents.JAMBOARD.USERS.UPDATE)
  // handleElementPositionChange(@MessageBody() body: any) {
  //   this.server.emit(SocketEvents.JAMBOARD.USERS.UPDATE, {
  //     id: body[0],
  //     event: SocketEvents.JAMBOARD.USERS.UPDATE,
  //     data: body[1],
  //   });
  //   // console.log(body);
  //   // this.usersService.handleElementPositionChange(body);
  // }
}
