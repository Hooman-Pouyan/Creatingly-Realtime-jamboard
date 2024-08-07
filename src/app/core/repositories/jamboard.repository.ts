import { inject, Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
import { Observable, switchMap, tap } from 'rxjs';
import {
  IJamComment,
  IUser,
} from '../../pages/brainstorming/jamboard/models/jamboard.model';
import { SocketService } from '../services/socket.service';

@Injectable({
  providedIn: 'root',
})
export class JamBoardRepository extends BaseRepository {
  socketService = inject(SocketService);

  addComment(
    jamboardId: string,
    elementId: string,
    data: any
  ): Observable<IJamComment[]> {
    return this.post(`${this.baseUrl}/comments`, {
      comments: data,
    });
  }

  getAllComments(jamboardId: string): Observable<IJamComment[]> {
    return this.get(`${this.baseUrl}/comments/?jamboardId=${jamboardId}`);
  }
}