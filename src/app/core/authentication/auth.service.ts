import {
  AfterViewInit,
  effect,
  inject,
  Inject,
  Injectable,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { API_BASE_URL } from '../../app.config';
import { BaseRepository } from '../repositories/base.repository';
import { UserProfileRepository } from '../repositories/userProfile.repository';
import {
  DeepSignal,
  patchState,
  SignalState,
  signalState,
} from '@ngrx/signals';
import { IUser } from '../../pages/brainstorming/jamboard/models/jamboard.model';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SocketService } from '../services/socket.service';
import { SocketEvents } from '../models/socket.model';
import { toSignal } from '@angular/core/rxjs-interop';

export interface IUsersState {
  isAuthenticated: boolean;
  userProfile: IUser | null;
  UsersInSession: IUser[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  socketService = inject(SocketService);
  userProfileRepository = inject(UserProfileRepository);
  router = inject(Router);

  constructor() {
    if (this.isAuthenticated()) {
      patchState(this.usersStore$, (state) => ({
        isAuthenticated: true,
        userProfile: this.getUserProfile(),
        UsersInSession: [...state.UsersInSession],
      }));
    }
    effect(
      () => {
        if (this.usersInSession()) {
          patchState(this.usersStore$, {
            UsersInSession: this.usersInSession(),
          });
        }
      },
      { allowSignalWrites: true }
    );
  }

  updateUsersInSession(action: string, id: string, userData: IUser) {
    console.log(action);

    let userIndex = this.usersStore$
      .UsersInSession()
      .findIndex((user) => user.id == id);
    if (action == 'login' && userIndex == -1) {
      patchState(this.usersStore$, (state) => ({
        UsersInSession: [...state.UsersInSession, userData],
      }));
      console.log('on login', this.usersStore$.UsersInSession());
    } else if (action == 'logout') {
      patchState(this.usersStore$, (state) => ({
        UsersInSession: state.UsersInSession.filter((user) => user.id !== id),
      }));
      console.log('on logout', this.usersStore$.UsersInSession());
    }
  }

  usersInitialState: IUsersState = {
    isAuthenticated: this.isAuthenticated(),
    userProfile: this.getUserProfile(),
    UsersInSession: [],
  };
  usersInSession: Signal<IUser[] | undefined> = toSignal(
    this.userProfileRepository.searchUsers('status=online')
  );

  // socket streams
  usersStore$: SignalState<IUsersState> = signalState(this.usersInitialState);
  usersSocketStream: Signal<IUser[]> = toSignal(
    this.socketService.onMessage(SocketEvents.JAMBOARD.USERS$)
  );

  updateUserStoreOnSocket = this.socketService
    .onMessage(SocketEvents.JAMBOARD.USERS$)
    .subscribe((event) => {
      // this.updateUserStore(event.type, event.data);
      this.updateUsersInSession(event.type, event.id, event.data);
    });

  login(data: { username?: string; password?: string }): void {
    this.userProfileRepository
      .getUserProfile(data.username!)
      .pipe(
        tap((loggedInUser: IUser) => {
          this.dispatchAuthSocketActions('login', loggedInUser);
          this.updateUserStore('login', loggedInUser);
          this.updateLocalSotrage(true, loggedInUser);
        })
      )
      .subscribe();
  }

  logout() {
    this.userProfileRepository
      .updateUser(this.usersStore$.userProfile()?.id!, {
        status: 'offline',
      })
      .subscribe();
    this.dispatchAuthSocketActions('logout', this.usersStore$.userProfile()!);
    this.updateUserStore('logout', this.getUserProfile());
    this.updateLocalSotrage(false, null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return (
      JSON.parse(localStorage.getItem('isAuthenticated') ?? 'false') ?? false
    );
  }

  getUsers(query: string): Observable<IUser[]> {
    return this.userProfileRepository.searchUsers(query);
  }

  getUserProfile() {
    return JSON.parse(localStorage.getItem('userProfile')!);
  }

  dispatchAuthSocketActions(action: string, data: IUser) {
    this.socketService.sendMessage(
      // (SocketEvents.JAMBOARD.USERS as Record<string, string>)[action],
      SocketEvents.JAMBOARD.USERS$,
      data.id,
      action,
      action == 'logout' ? null : data
    );
  }

  updateLocalSotrage(isAuthenticated: boolean, userProfile: IUser | null) {
    if (!isAuthenticated) localStorage.removeItem('userProfile');
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }

  updateUserStore(
    action: string,
    userData: IUser,
    newState?: Partial<IUsersState>
  ) {
    switch (action) {
      case 'login':
        patchState(this.usersStore$, (state) => ({
          isAuthenticated: true,
          userProfile: userData,
          // UsersInSession: [...state.UsersInSession, userData],
        }));
        this.userProfileRepository.updateUser(
          this.usersStore$.userProfile()?.id!,
          { status: 'online' }
        );
        break;
      case 'logout':
        patchState(this.usersStore$, (state) => ({
          isAuthenticated: false,
          userProfile: null,
          // UsersInSession: state.UsersInSession.filter(
          //   (user) => user.id == userData.id
          // ),
        }));
        this.userProfileRepository.updateUser(
          this.usersStore$.userProfile()?.id!,
          { status: 'offline' }
        );
        break;
      case 'state':
        patchState(this.usersStore$, newState!);
        break;
      case 'update':
        patchState(this.usersStore$, (state) => ({
          UsersInSession: [...state.UsersInSession, userData],
        }));
        break;
    }
  }
}
