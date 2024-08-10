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
import { IJamElement } from './models/element.model';
import { JamsidebarComponent } from './components/jamsidebar/jamsidebar.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AuthService } from '../../../core/authentication/auth.service';
import { IJamboardState, JamboardStore } from './states/jamboard.state';
import { ActivatedRoute } from '@angular/router';
import { CommentFlowComponent } from '../../../shared/components/comment-flow/comment-flow.component';
import { LayoutService } from '../../../core/layout/services/layout.service';
import { TagComponent } from '../../../shared/components/tag/tag.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

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
  }

  jamboardStore = inject(JamboardStore);
  authService = inject(AuthService);
  activeSettings = signal<string>('general');
  jamBoardService = inject(JamBoardService);
  socketService = inject(SocketService);
  ConvertToPropertyPipe = inject(ConvertToPropertyPipe);
  jamboardEvents = SocketEvents.JAMBOARD;
  canvas = viewChild('canvas');

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    console.log(event);

    event.preventDefault();
    const data = event.dataTransfer?.getData('text');
    const draggedElement = document.getElementById(data!);
    const dropZone = event.target as HTMLElement;

    if (dropZone && draggedElement) {
      dropZone.appendChild(draggedElement); // Move the dragged element to the drop zone
      console.log(`Dropped into ${dropZone.id}`);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Necessary to allow a drop
    console.log('Drag Over:', event.target);
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
}
