import { inject, Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
import { Observable, switchMap, tap } from 'rxjs';
import { IUser } from '../../pages/brainstorming/jamboard/models/jamboard.model';
import { SocketService } from '../services/socket.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileRepository extends BaseRepository {
  socketService = inject(SocketService);

  getUserProfile(username: string): Observable<IUser> {
    let url = this.baseUrl + `/users/?name=${username}`;
    return this.getWithoutCache(url).pipe(
      switchMap((res: any) => this.updateUser(res[0].id, { status: 'online' }))
    );
  }

  searchUsers(query: string): Observable<IUser[]> {
    let url = this.baseUrl + `/users/?${query}`;
    return this.getWithoutCache(url);
  }

  updateUser(userId: string, data: unknown): Observable<IUser> {
    let url = this.baseUrl + `/users/${userId}`;
    return this.patch(url, data);
  }
}
