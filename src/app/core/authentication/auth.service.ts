import {
  effect,
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
export interface IAuthState {
  isAuthenticated: boolean;
  userProfile: IUser;
  UsersInSession: IUser[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  apiUrl: string;

  constructor(
    @Inject(API_BASE_URL) baseUrl: string,
    private userProfileRepository: UserProfileRepository,
    private router: Router,
    private socketService: SocketService
  ) {
    this.apiUrl = baseUrl;
    if (JSON.parse(localStorage.getItem?.('isAuthenticated')!)) {
      patchState(this.authStore, {
        isAuthenticated: true,
        userProfile: this.getUserProfile(),
        UsersInSession: [],
      });
      console.log(this.authStore());
    }
  }
  ngOnInit(): void {}

  authInitialState: IAuthState = {
    isAuthenticated: this.isAuthenticated(),
    userProfile: this.getUserProfile(),
    UsersInSession: [],
  };

  authStore: SignalState<IAuthState> = signalState(this.authInitialState);

  login(data: { email?: string; password?: string }): void {
    this.userProfileRepository
      .getUserProfile(data.email!)
      .pipe(
        tap((res: IUser) => {
          this.socketService.sendMessage(
            'jamboard:users:login',
            res.id,
            'login',
            res
          );
          patchState(this.authStore, {
            isAuthenticated: true,
            userProfile: res,
            UsersInSession: [],
          });
          localStorage.setItem('isAuthenticated', JSON.stringify(true));
          localStorage.setItem('userProfile', JSON.stringify(res));
        })
      )
      .subscribe();
  }

  logout() {
    patchState(this.authStore, {
      isAuthenticated: false,
      userProfile: undefined,
      UsersInSession: [],
    });
    localStorage.removeItem('userProfile');
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigate(['/']);
  }

  getUserProfile() {
    return JSON.parse(localStorage.getItem('userProfile')!);
  }

  isAuthenticated(): boolean {
    return (
      JSON.parse(localStorage.getItem('isAuthenticated') ?? 'false') ?? false
    );
  }
  getUsers(query: string): Observable<IUser[]> {
    return this.userProfileRepository.searchUsers(query);
  }
}
