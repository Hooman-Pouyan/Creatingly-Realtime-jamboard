import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../authentication/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {}

  authService = inject(AuthService);
  socketService = inject(SocketService);
  usersInSession = this.authService.usersStore$.UsersInSession;
  userProfile = this.authService.usersStore$.userProfile;
  isCollapsed = false;

  a = effect(() => {
    if (this.userProfile()) {
      this.cursorTracking.subscribe((event) => {});
    }
  });

  login(userData: any) {
    this.authService.login(userData);
  }

  cursorTracking = fromEvent(document, 'mousemove').pipe(
    takeWhile(() => !!this.userProfile()),
    throttleTime(500),
    switchMap((event: any) => of({ x: event.x, y: event.y })),
    tap((position) =>
      this.socketService.sendMessage(
        SocketEvents.JAMBOARD.USERS$,
        this.userProfile()?.id!,
        'cursor',
        position
      )
    )
  );

  logout() {
    this.authService.logout();
  }
}
