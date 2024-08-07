import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
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
import { ConnectorsDirective } from '../../../../../shared/directives/connectors.directive';
import { ResizeDirective } from '../../../../../shared/directives/resize.directive';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { BaseJamElementComponent } from '../base-jam-element/base-jam-element.component';
import { ContextMenuDirective } from '../../../../../shared/directives/context-menu.directive';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    CommonModule,
    DragdropDirective,
    ConnectorsDirective,
    ResizeDirective,
    NzCardModule,
    NzAvatarModule,
    NzIconModule,
    ContextMenuDirective,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  hostDirectives: [
    // {
    //   directive: DragdropDirective,
    //   outputs: ['positionUpdate'],
    //   inputs: ['latestPosition', 'elementId'],
    // },
    // {
    //   directive: ResizeDirective,
    //   inputs: ['latestSize', 'minAllowedSize', 'maxAllowedSize', 'elementId'],
    //   outputs: ['sizeUpdate'],
    // },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent extends BaseJamElementComponent implements OnInit {
  minAllowedSize = 200;
  maxAllowedSize = 600;
}
