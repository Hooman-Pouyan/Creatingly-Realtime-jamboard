import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  InputSignal,
  InputSignalWithTransform,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  IUser,
  IUserCursor,
} from '../../../pages/brainstorming/jamboard/models/jamboard.model';
import { SocketService } from '../../../core/services/socket.service';
import { SocketEvents } from '../../../core/models/socket.model';
import { filter, take } from 'rxjs/operators';
import { AuthService } from '../../../core/authentication/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-cursor.component.html',
  styleUrl: './user-cursor.component.scss',
})
export class UserCursorComponent implements OnInit {
  authService = inject(AuthService);
  socketService = inject(SocketService);
  destoryRef$ = inject(DestroyRef);

  constructor() {
    effect(() => {
      if (this.authService.usersStore$())
        this.userId = this.authService.usersStore$().userProfile?.id!;
    });
  }

  ngOnInit(): void {
    this.socketService
      .onMessage(SocketEvents.JAMBOARD.USERS$)
      .pipe(
        takeUntilDestroyed(this.destoryRef$),
        filter(
          (message) => message.type == 'cursor' && message.id !== this.userId
        )
      )
      .subscribe((message) => {
        this.updateUsersCursers(message.id, message.data);
        console.log(message.id, this.userId);
      });
  }

  userId = this.authService.getUserProfile()?.id;
  activeUsers: InputSignalWithTransform<any[], IUser[]> = input.required({
    transform: (userProfile) => {
      const cursers = userProfile.map((user) => ({
        id: user.id,
        cursor: user.curser,
      }));
      this.UsersInSession.set(cursers);
      return cursers;
    },
  });
  UsersInSession: WritableSignal<any[]> = signal([]);

  updateUsersCursers(userId: string, newPosition: { x: number; y: number }) {
    this.UsersInSession.update((users: any) => {
      return users.map((user: any) => {
        return user.id == userId
          ? { ...user, cursor: { ...user.cursor, position: newPosition } }
          : user;
      });
    });
  }
}
