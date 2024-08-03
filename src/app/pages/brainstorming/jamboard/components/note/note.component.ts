import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  InjectionToken,
  input,
  InputSignal,
  OnInit,
  signal,
} from '@angular/core';
import { DragdropDirective } from '../../../../../shared/directives/dragdrop.directive';
import { ConnectorsService } from '../../services/connectors.service';
import { ConnectorsDirective } from '../../../../../shared/directives/connectors.directive';
import { ResizeDirective } from '../../../../../shared/directives/resize.directive';
import { INote } from '../../jamboard.component';
@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    CommonModule,
    DragdropDirective,
    ConnectorsDirective,
    ResizeDirective,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  hostDirectives: [
    {
      directive: DragdropDirective,
      outputs: ['positionUpdate'],
      inputs: ['latestPosition'],
    },
    {
      directive: ResizeDirective,
      inputs: ['latestSize'],
      outputs: ['sizeUpdate'],
    },
  ],
})
export class NoteComponent implements OnInit {
  ngOnInit(): void {}

  constructor() {
    effect(() => {
      console.log(this.noteState());
    });
  }
  pinned = signal(false);
  opacity = signal(0.8);
  noteState: InputSignal<INote | undefined> = input();
}
