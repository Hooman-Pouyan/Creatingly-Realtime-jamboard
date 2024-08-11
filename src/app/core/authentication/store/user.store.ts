import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SignalState, signalState } from '@ngrx/signals';
import { IUser } from '../../../pages/brainstorming/jamboard/models/element.model';
import { SocketEvents } from '../../models/socket.model';
import { IUsersState } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UserStore {
  // usersInitialState: IUsersState = {
  //   isAuthenticated: this.isAuthenticated(),
  //   userProfile: this.getUserProfile(),
  //   UsersInSession: [],
  // };
  // usersInSession: Signal<IUser[] | undefined> = toSignal(
  //   this.userProfileRepository.searchUsers('status=online')
  // );
  // state: SignalState<IUsersState> = signalState(this.usersInitialState);
  // usersSocketStream: Signal<IUser[]> = toSignal(
  //   this.socketService.onMessage(SocketEvents.JAMBOARD.USERS$)
  // );
}
