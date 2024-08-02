import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins (for development purposes only, change this in production)
    methods: ['GET', 'POST'],
  },
})
export class GateWay {
  @SubscribeMessage('JamBoard')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
  }

  // @SubscribeMessage('updateElementPosition')
  // handleUpdateElementPosition(@MessageBody() data: any): void {
  //   // this.server.emit('elementPositionUpdated', data);
  // }

  // @SubscribeMessage('cursorMoved')
  // handleCursorMoved(@MessageBody() data: any): void {
  //   // this.server.emit('cursorUpdated', data);
  // }
}
