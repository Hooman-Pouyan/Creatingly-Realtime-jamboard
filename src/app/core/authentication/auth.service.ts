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
import { Observable } from 'rxjs';
export interface IAuthState {
  isAuthenticated: Signal<boolean>;
  userProfile: DeepSignal<IUser>;
  activeUsersInSession: DeepSignal<IUser[]>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  apiUrl: string;

  constructor(
    @Inject(API_BASE_URL) baseUrl: string,
    private userProfileRepository: UserProfileRepository,
    private router: Router
  ) {
    this.apiUrl = baseUrl;
  }
  ngOnInit(): void {
    localStorage.setItem('isAuthenticated', 'false');
  }

  authInitialState: IAuthState = {
    isAuthenticated: signal(this.isAuthenticated()),
    userProfile: this.getUserProfile(),
    activeUsersInSession: signal<IUser[]>([]),
  };

  authStore: SignalState<IAuthState> = signalState(this.authInitialState);

  login(data: { email?: string; password?: string }): void {
    console.log(data.email);

    this.userProfileRepository.getUserProfile(data.email!).subscribe((res) => {
      console.log(res);
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      localStorage.setItem('userProfile', JSON.stringify(res));
    });
  }

  logout() {
    patchState(this.authStore, {
      isAuthenticated: signal(false),
      userProfile: undefined,
      activeUsersInSession: signal([]),
    });
    localStorage.removeItem('userProfile');
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigate(['/']);
  }

  a = effect((trigger$) => {
    console.log(this.authStore());
  });

  getUserProfile() {
    return this.isAuthenticated()
      ? JSON.parse(localStorage.getItem('userProfile') ?? '')
      : null;
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
