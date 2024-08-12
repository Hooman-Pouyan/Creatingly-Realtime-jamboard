import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  Signal,
  signal,
  viewChild,
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
import { IJamComment, IUser, TModules } from './models/jamboard.model';
import { IJamElement, TJamElement } from './models/element.model';
import { JamsidebarComponent } from './components/jamsidebar/jamsidebar.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AuthService } from '../../../core/authentication/auth.service';
import { IJamboardState, JamboardStore } from './states/jamboard.state';
import { ActivatedRoute } from '@angular/router';
import { CommentFlowComponent } from '../../../shared/components/comment-flow/comment-flow.component';
import { LayoutService } from '../../../core/layout/services/layout.service';
import { TagComponent } from '../../../shared/components/tag/tag.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-jamboard',
  standalone: true,
  imports: [
    NoteComponent,
    CommonModule,
    JamsidebarComponent,
    NzGridModule,
    CommentFlowComponent,
    TagComponent,
    ButtonComponent,
  ],
  providers: [ConvertToPropertyPipe],
  templateUrl: './jamboard.component.html',
  styleUrl: './jamboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JamboardComponent implements OnInit {
  constructor(
    private jamboardService: JamBoardService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.jamboardStore.loadElements();
    this.jamboardStore.loadComments();
    this.ListenToElementCreation();
  }

  jamboardStore = inject(JamboardStore);
  authService = inject(AuthService);
  activeSettings = signal<string>('general');
  jamBoardService = inject(JamBoardService);
  socketService = inject(SocketService);
  ConvertToPropertyPipe = inject(ConvertToPropertyPipe);
  jamboardEvents = SocketEvents.JAMBOARD;
  canvas = viewChild('canvas');
  userId = this.authService.usersStore$.userProfile()?.id;

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData(
      'application/json',
      JSON.stringify({
        id: (event.target as HTMLElement).id,
        type: (event.target as HTMLElement).textContent,
      })
    );
    console.log('Drag Start:', event.target);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Necessary to allow a drop
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('application/json');
    const dropZone = event.target as HTMLElement;

    if (dropZone.classList.contains('jamboard')) {
      this.generateANewElement(JSON.parse(data!));
    }
  }

  updateJamBoardState(event: {
    event: string;
    elementId: string;
    property: string;
    data: any;
  }) {
    patchState(this.jamboardStore.state, (state) => ({
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

  generateANewElement(data: { id: string; type: TJamElement }) {
    const newElement: IJamElement = {
      id: data.id,
      appearence: {},
      content: {
        title: 'Title',
        text: 'This is a new element',
        imageUrl: 'url',
      },
      info: {},
      type: data.type,
      size: {
        width: 200,
        height: 200,
      },
      position: {
        x: 400,
        y: 200,
      },
      status: '',
      options: {},
    };

    patchState(this.jamboardStore.state, (state) => ({
      ...state,
      elements: [...state.elements, newElement],
    }));

    this.jamBoardService.addElement('1', newElement).subscribe();

    this.socketService.sendMessage(
      SocketEvents.JAMBOARD.ELEMENT$,
      newElement.id,
      'elements',
      newElement
    );
  }

  ListenToElementCreation() {
    this.socketService
      .onMessage(SocketEvents.JAMBOARD.ELEMENT$)
      .pipe(
        filter(
          (message) =>
            message.type == 'elements' && this.userId != message?.userId
        )
      )
      .subscribe({
        next: (event) => {
          patchState(this.jamboardStore.state, (state) => ({
            ...state,
            elements: [...state.elements, event.data],
          }));
          console.log(
            'this.jamboardStore.state()this.jamboardStore.state()this.jamboardStore.state()',
            this.jamboardStore.state()
          );
        },
      });
  }
}
