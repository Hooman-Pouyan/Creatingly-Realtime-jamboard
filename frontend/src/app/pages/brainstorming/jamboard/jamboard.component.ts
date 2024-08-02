import { Component, inject, OnInit, signal } from '@angular/core';
import { NoteComponent } from './components/note/note.component';
import { ConnectorsService } from './services/connectors.service';
import { JamBoardService } from './services/jamboard.service';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketService } from '../../../core/services/socket.service';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-jamboard',
  standalone: true,
  imports: [NoteComponent, SocketIoModule],
  templateUrl: './jamboard.component.html',
  styleUrl: './jamboard.component.scss',
})
export class JamboardComponent implements OnInit {
  jamBoardService = inject(JamBoardService);
  socketService = inject(SocketService);
  jamBoardSocketStream = toSignal(this.socketService.onMessage('JamBoard'));
  ngOnInit(): void {}

  notes = Array(5)
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

  dispatchEvent(event: string, data: any) {
    this.socketService.sendMessage(event, data);
  }
}
