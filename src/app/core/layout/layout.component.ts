import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../authentication/auth.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  auditTime,
  bufferTime,
  fromEvent,
  map,
  of,
  switchMap,
  takeWhile,
  tap,
  throttleTime,
} from 'rxjs';
import { SocketService } from '../services/socket.service';
import { SocketEvents } from '../models/socket.model';
import { JamboardStore } from '../../pages/brainstorming/jamboard/states/jamboard.state';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    HeaderComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {
    this.router.events.subscribe((params) => {
      if (params instanceof NavigationEnd) {
        this.jamboardStore.updateState({
          delta: 'activeModule',
          data: params.url.split('/')[1],
        });
      }
    });
  }

  authService = inject(AuthService);
  socketService = inject(SocketService);
  jamboardStore = inject(JamboardStore);
  router = inject(Router);
  usersInSession = this.authService.usersStore$.UsersInSession;
  userProfile = this.authService.usersStore$.userProfile;
  isCollapsed = false;
  destroyRef = inject(DestroyRef);

  reactToUserProfile = effect(() => {
    if (this.userProfile()) {
      this.cursorTracking.subscribe();
    }
  });

  login(userData: any) {
    this.authService.login(userData);
  }

  cursorTracking = fromEvent(document, 'mousemove').pipe(
    takeWhile(() => !!this.userProfile()),
    takeUntilDestroyed(this.destroyRef),
    throttleTime(500),
    // bufferTime(500),
    // auditTime(500),
    switchMap((event: any) => of({ x: event.x, y: event.y })),
    tap((position) =>
      this.socketService.sendMessage(
        SocketEvents.JAMBOARD.USERS$,
        this.userProfile()?.id!,
        'cursor',
        {
          ...position,
          activeModule: this.jamboardStore.state.activeModule(),
          projectId: this.jamboardStore.state.id(),
        }
      )
    )
  );

  logout() {
    this.authService.logout();
  }
}
