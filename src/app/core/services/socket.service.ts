import { inject, Injectable, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Environment } from '../../../environments/environment.production';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(Environment.socketUrl, {
      transports: ['websocket'], // Specify the transport
    });
  }
  onMessage(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });

      return () => {
        this.socket.off(eventName);
      };
    });
  }

  sendMessage(event: string, id: string, type: string, data: any): void {
    console.log(event, id, type, data);
    this.socket.emit(event, id, type, data);
  }
}
