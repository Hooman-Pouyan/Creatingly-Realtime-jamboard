import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
  viewChild,
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
import { HeaderComponent } from './components/header/header.component';
import { LayoutService } from './services/layout.service';
import { provideIcons } from '@ng-icons/core';
import { bootstrapFullscreenExit } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

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
    NgIcon,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [
    provideIcons({
      bootstrapFullscreenExit,
    }),
  ],
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
  bootstrapFullscreenExit = bootstrapFullscreenExit;

  authService = inject(AuthService);
  socketService = inject(SocketService);
  jamboardStore = inject(JamboardStore);
  layoutService = inject(LayoutService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  usersInSession = this.authService.usersStore$.UsersInSession;
  userProfile = this.authService.usersStore$.userProfile;
  isCollapsed = this.layoutService.isMenuCollapsed;
  isFullScreenMode = this.layoutService.fullScreenMode;

  layoutSidebar = viewChild('layoutSidebar');
  layoutHeader = viewChild('layoutHeader');

  a = effect(() => {
    // console.log(this.layoutSidebar());
    // console.log(this.layoutService.isMenuCollapsed());
    // console.log(this.layoutHeader());
    // console.log(this.isCollapsed);
  });

  toggleMenu() {
    this.layoutService.isMenuCollapsed.set(
      !this.layoutService.isMenuCollapsed()
    );
  }

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

  toggleFullScreen() {
    this.layoutService.fullScreenMode.set(!this.layoutService.fullScreenMode());
  }
}
