import { CommonModule } from '@angular/common';
import { Component, inject, InjectionToken, signal } from '@angular/core';
import { DragdropDirective } from '../../../../../shared/directives/dragdrop.directive';
import { ConnectorsService } from '../../services/connectors.service';
import { ConnectorsDirective } from '../../../../../shared/directives/connectors.directive';
@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, DragdropDirective, ConnectorsDirective],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  hostDirectives: [
    {
      directive: DragdropDirective,
      outputs: ['positionUpdate'],
    },
  ],
})
export class NoteComponent {
  notes = Array(1)
    .fill(0)
    .map((_, i) => ({
      id: `note-${i}`,
      pinned: false,
      opacity: 1,
      width: 200,
      height: 200,
    }));

  pinned = signal(false);
  opacity = signal(0.8);
  width = signal(300);
  height = signal(200);
  connectorService = inject(ConnectorsService);

  connections = this.connectorService.connections();
}
