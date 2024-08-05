import { inject, Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { BaseRepository } from '../repositories/base.repository';
import { UserProfileRepository } from '../repositories/userProfile.repository';
import { SocketService } from './socket.service';
import { SocketEvents } from '../models/socket.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  authService = inject(AuthService);
  socketService = inject(SocketService);
  userProfileRepository = inject(UserProfileRepository);

  updateUserProfile(userId: string, data: any) {
    return this.userProfileRepository.updateUser(userId, data);
  }

  getUsersByQuery(query: string) {
    return this.authService.getUsers(query);
  }

  onUsersMessages() {
    return this.socketService.onMessage(SocketEvents.JAMBOARD.USERS.LOGIN);
  }
}
