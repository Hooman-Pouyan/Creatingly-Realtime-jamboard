import {
  Component,
  effect,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { NoteComponent } from './components/note/note.component';
import { ConnectorsService } from './services/connectors.service';
import { JamBoardService } from './services/jamboard.service';
import { SocketService } from '../../../core/services/socket.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { SocketEvents } from '../../../core/models/socket.model';
import { patchState, SignalState, signalState } from '@ngrx/signals';
import { makeOptional } from '../../../core/models/transformers';
import { IUser } from './models/note.model';

export interface IJamboardState {
  notes: INote[];
  users: IUser[];
}

export interface INote {
  id: string;
  label: string;
  createdAt: Date;
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isPinned: boolean;
  isBeingDragged: boolean;
  isBeingResized: boolean;
  appearence: {
    opacity: number;
  };
}

@Component({
  selector: 'app-jamboard',
  standalone: true,
  imports: [NoteComponent, CommonModule],
  templateUrl: './jamboard.component.html',
  styleUrl: './jamboard.component.scss',
})
export class JamboardComponent implements OnInit {
  jamboardState: SignalState<IJamboardState> = signalState({
    notes: [
      {
        id: '1',
        label: 'test',
        content: 'test content',
        createdAt: new Date(),
        position: { x: 200, y: 200 },
        size: { width: 300, height: 300 },
        isPinned: false,
        isBeingDragged: false,
        isBeingResized: true,
        appearence: {
          opacity: 0.8,
        },
      },
    ],
    users: [],
  });

  jamBoardService = inject(JamBoardService);
  socketService = inject(SocketService);
  jamboardEvents = SocketEvents.JAMBOARD;
  latestPosition = toSignal(
    this.socketService.onMessage(SocketEvents.JAMBOARD.ELEMENT.POSITION)
  );
  latestSize = toSignal(
    this.socketService.onMessage(SocketEvents.JAMBOARD.ELEMENT.SIZE)
  );

  a = effect(() => {
    console.log(this.jamboardState(), this.latestSize());
    patchState(this.jamboardState, (state) => ({
      ...state,
      notes: state.notes.map((note) => ({
        ...note,
        size: {
          width: 100,
          height: 100,
        },
      })),
    }));
  });

  ngOnInit(): void {
    // this.socketService
    //   .onMessage(SocketEvents.JAMBOARD.ELEMENT.POSITION)
    //   .subscribe((data) => {
    //     this.latestPosition.set(data);
    //   });
    // this.socketService
    //   .onMessage(SocketEvents.JAMBOARD.ELEMENT.SIZE)
    //   .subscribe((data) => {
    //     this.latestSize.set(data);
    //   });
  }

  pinned = signal(false);
  opacity = signal(0.8);
  width = signal(300);
  height = signal(200);
  connectorService = inject(ConnectorsService);

  connections = this.connectorService.connections();

  dispatchEvent(event: string, data: any) {
    this.socketService.sendMessage(event, data);
  }
}
