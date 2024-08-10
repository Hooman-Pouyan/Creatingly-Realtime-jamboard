import { inject, Injectable } from '@angular/core';
import { BaseRepository } from '../../../../core/repositories/base.repository';
import { JamBoardRepository } from '../../../../core/repositories/jamboard.repository';
import { tap } from 'rxjs/operators';
import { SocketEvents } from '../../../../core/models/socket.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { SocketService } from '../../../../core/services/socket.service';
import { IJamComment } from '../models/jamboard.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}

  jamobardRepository = inject(JamBoardRepository);
  socketService = inject(SocketService);

  getAllComments(jamboardId: string): Observable<IJamComment[]> {
    return this.jamobardRepository.getAllComments(jamboardId);
  }

  addComment(jamboardId: string, elementId: string, data: any) {
    this.jamobardRepository
      .addComment(jamboardId, elementId, data)
      .pipe(
        tap((comments) => {
          this.dispatchSocketEvent(SocketEvents.JAMBOARD.COMMENTS$, comments);
        })
      )
      .subscribe();
  }

  onCommentMessages = toSignal(
    this.socketService.onMessage(SocketEvents.JAMBOARD.COMMENTS$)
  );

  dispatchSocketEvent(event: string, data: any) {
    this.socketService.sendMessage(event, data.id, 'comment', data);
  }
}
