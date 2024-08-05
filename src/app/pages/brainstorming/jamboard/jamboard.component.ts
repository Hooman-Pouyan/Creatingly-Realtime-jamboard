import {
  ChangeDetectionStrategy,
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
import { IJamElement } from './models/element.model';
import { JamsidebarComponent } from './components/jamsidebar/jamsidebar.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
export interface IJamboardState {
  id: string;
  name: string;
  elements: IJamElement[];
  users: IUser[];
  isLoading: boolean;
}

@Component({
  selector: 'app-jamboard',
  standalone: true,
  imports: [NoteComponent, CommonModule, JamsidebarComponent, NzGridModule],
  providers: [ConvertToPropertyPipe],
  templateUrl: './jamboard.component.html',
  styleUrl: './jamboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JamboardComponent implements OnInit {
  constructor() {}

  activeSettings = signal<string>('general');
  jamboardState: SignalState<IJamboardState> = signalState({
    id: '1',
    name: 'project 1',
    elements: [
      {
        id: '1',
        appearence: {},
        data: {
          content: {
            title: 'text',
            content: 'hi',
            imageUrl: 'aa',
          },
        },
        info: {},
        size: {
          width: 600,
          height: 600,
        },
        position: {
          x: 400,
          y: 200,
        },
        status: '',
        options: {},
      },
      {
        id: '2',
        appearence: {},
        data: {
          content: {
            title: 'contentttttt',
            content: 'heyyyyy',
            imageUrl: 'gasasas',
          },
        },
        info: {},
        size: {
          width: 400,
          height: 300,
        },
        position: {
          x: 1000,
          y: 500,
        },
        status: '',
        options: {},
      },
    ],
    users: [
      {
        id: '1',
        name: 'user 1',
        avatarUrl: 'https://avatars.githubusercontent.com/u/10214025?v=4',
        curser: {
          id: '1',
          color: 'red',
          position: {
            x: 100,
            y: 100,
          },
        },
        status: 'editting',
        activeModule: 'jamboard',
      },
      {
        id: '2',
        name: 'user 2',
        avatarUrl: 'https://avatars.githubusercontent.com/u/10214025?v=4',
        curser: {
          id: '2',
          color: 'blue',
          position: {
            x: 200,
            y: 200,
          },
        },
        status: 'offline',
        activeModule: 'planning',
      },
      {
        id: '3',
        name: 'user 3',
        avatarUrl: 'https://avatars.githubusercontent.com/u/10214025?v=4',
        curser: {
          id: '3',
          color: 'green',
          position: {
            x: 300,
            y: 300,
          },
        },
        status: 'online',
        activeModule: 'design',
      },
    ],
    isLoading: false,
  });

  jamBoardService = inject(JamBoardService);
  socketService = inject(SocketService);
  ConvertToPropertyPipe = inject(ConvertToPropertyPipe);
  jamboardEvents = SocketEvents.JAMBOARD;

  updateJamBoardState(event: {
    event: string;
    elementId: string;
    property: string;
    data: any;
  }) {
    patchState(this.jamboardState, (state) => ({
      ...state,
      elements: state.elements.map((element: IJamElement) =>
        element.id == event.elementId
          ? {
              ...element,
              [event.property]: {
                ...(element[event.property as keyof IJamElement] as object),
                ...event.data,
              },
            }
          : element
      ),
    }));
  }

  sendSocketMessage(id: string = '1', event: string, data: IJamboardState) {
    // this.socketService.sendMessage(id, event, data);
  }

  r = effect(
    () => {
      // console.log('this.jamboardState()', this.jamboardState());
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
    //     this.updateJamBoardState(
    //       data.id,
    //       this.ConvertToPropertyPipe.transform(data.event, 'jamboard') ?? '',
    //       data,
    //       data.event
    //     );
    //   });
    // this.socketService
    //   .onMessage(SocketEvents.JAMBOARD.ELEMENT.SIZE)
    //   .subscribe((data) => {
    //     this.latestSize.set(data);
    //   });
  }
}
