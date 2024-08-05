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

  getUserProfile(userId: string): Observable<IUser> {
    let url = this.baseUrl + `users/${userId}`;
    console.log(url);
    return this.getWithoutCache(url).pipe(
      switchMap((res: any) => this.updateUser(res.id, { status: 'online' })),
      tap((res: IUser) =>
        this.socketService.sendMessage('users', res.id, 'login', res)
      )
    );
  }

  searchUsers(query: string): Observable<IUser[]> {
    let url = this.baseUrl + `users/?${query}`;
    console.log(url);
    return this.getWithoutCache(url);
  }

  updateUser(userId: string, data: unknown): Observable<IUser> {
    let url = this.baseUrl + `users/${userId}`;
    console.log(url);
    return this.patch(url, data);
  }
}
