import { inject, Injectable, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Environment } from '../../../environments/environment.production';
import { deflate } from 'pako';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(Environment.socketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    this.setupListeners();
  }

  private setupListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('reconnect_attempt', (attempt) => {
      console.log(`Reconnection attempt ${attempt}`);
    });

    this.socket.on('reconnect_failed', () => {
      console.log('Reconnection failed');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
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
    const message = {
      event,
      id,
      type,
      data,
    };
    const compressedMessage = JSON.stringify(deflate(JSON.stringify(message)));
    this.socket.emit(event, id, type, data);
  }
}
