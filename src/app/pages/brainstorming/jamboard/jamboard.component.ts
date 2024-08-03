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
import { ConvertToPropertyPipe } from '../../../shared/pipes/ConvertToProperty.pipe';
import { IUser } from './models/jamboard.model';

export interface IJamboardState {
  notes: INote[];
  users: IUser[];
  isLoading: boolean;
}

export interface INote {
  id: string;
  label: string;
  createdAt: Date;
  content: string;
  position: { x: number; y: number; isBeingDragged: boolean };
  size: { width: number; height: number; isBeingResized: boolean };
  isPinned: boolean;
  appearence: {
    opacity: number;
  };
}

@Component({
  selector: 'app-jamboard',
  standalone: true,
  imports: [NoteComponent, CommonModule],
  providers: [ConvertToPropertyPipe],
  templateUrl: './jamboard.component.html',
  styleUrl: './jamboard.component.scss',
})
export class JamboardComponent implements OnInit {
  constructor() {}

  jamboardState: SignalState<IJamboardState> = signalState({
    notes: [
      {
        id: '1',
        label: 'test',
        content: 'test content',
        createdAt: new Date(),
        position: { x: 200, y: 200, isBeingDragged: false },
        size: { width: 300, height: 300, isBeingResized: false },
        isPinned: false,
        appearence: {
          opacity: 0.8,
        },
      },
      // {
      //   id: '1',
      //   label: 'test',
      //   content: 'test content',
      //   createdAt: new Date(),
      //   position: { x: 200, y: 200, isBeingDragged: false },
      //   size: { width: 300, height: 300, isBeingResized: false },
      //   isPinned: false,
      //   appearence: {
      //     opacity: 0.8,
      //   },
      // },
    ],
    users: [],
    isLoading: false,
  });

  jamBoardService = inject(JamBoardService);
  socketService = inject(SocketService);
  ConvertToPropertyPipe = inject(ConvertToPropertyPipe);
  jamboardEvents = SocketEvents.JAMBOARD;
  latestPosition = toSignal(
    this.socketService.onMessage(SocketEvents.JAMBOARD.ELEMENT.POSITION)
  );
  latestSize = toSignal(
    this.socketService.onMessage(SocketEvents.JAMBOARD.ELEMENT.SIZE)
  );

  updateJamBoardState(
    noteId: string,
    property: string,
    data: any,
    eventName: string
  ) {
    patchState(this.jamboardState, (state) => ({
      ...state,
      notes: state.notes.map((note: INote) =>
        note.id == noteId
          ? {
              ...note,
              [property]: {
                ...(note[property as keyof INote] as object),
                ...data,
              },
            }
          : note
      ),
    }));
    this.sendSocketMessage(eventName, this.jamboardState());
  }

  sendSocketMessage(event: string, data: IJamboardState) {
    this.socketService.sendMessage(event, data);
  }

  r = effect(
    () => {
      // patchState(this.jamboardState, (state) => ({
      //   ...state,
      //   notes: state.notes.map((note) =>
      //     note.id == '1'
      //       ? {
      //           ...note,
      //           size: {
      //             width: this.latestSize().width,
      //             height: this.latestSize().height,
      //           },
      //         }
      //       : note
      //   ),
      // }));
    },
    { allowSignalWrites: true }
  );

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

  dispatchEvent(noteId: string, eventName: string, data: any) {
    this.updateJamBoardState(
      noteId,
      this.ConvertToPropertyPipe.transform(eventName, 'jamboard') ?? '',
      data,
      eventName
    );
  }
}
