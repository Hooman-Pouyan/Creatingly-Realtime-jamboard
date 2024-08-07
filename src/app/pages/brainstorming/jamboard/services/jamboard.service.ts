import { Inject, inject, Injectable, OnInit, Optional } from '@angular/core';
import { SocketService } from '../../../../core/services/socket.service';
import { API_BASE_URL } from '../../../../app.config';
import { Observable } from 'rxjs';
import { BaseRepository } from '../../../../core/repositories/base.repository';
import { IJamElement } from '../models/element.model';
import { IJamComment } from '../models/jamboard.model';

@Injectable({
  providedIn: 'root',
})
export class JamBoardService implements OnInit {
  constructor(@Optional() @Inject(API_BASE_URL) private baseUrl: string) {}
  ngOnInit(): void {}
  socketService = inject(SocketService);
  baseRepo = inject(BaseRepository);

  getAllElements(): Observable<IJamElement[]> {
    return this.baseRepo.getWithoutCache<IJamElement[]>(
      `${this.baseUrl}/elements`
    );
  }

  getAllComments(jamboardId: string): Observable<IJamComment[]> {
    return this.baseRepo.getWithoutCache<IJamComment[]>(
      `${this.baseUrl}/comments/?jamboardId=${jamboardId}`
    );
  }
}
