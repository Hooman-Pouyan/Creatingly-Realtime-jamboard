import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
  OutputRef,
} from '@angular/core';
import { patchState, SignalState, signalState, withState } from '@ngrx/signals';
import { SocketEvents } from '../../../../../core/models/socket.model';
import { SocketService } from '../../../../../core/services/socket.service';
import { IJamElement } from '../../models/element.model';
import { filter } from 'rxjs';
import { state } from '@angular/animations';
import { ConvertToPropertyPipe } from '../../../../../shared/pipes/ConvertToProperty.pipe';

@Component({
  selector: 'app-base-jam-element',
  standalone: true,
  imports: [ConvertToPropertyPipe],
  templateUrl: './base-jam-element.component.html',
  styleUrl: './base-jam-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseJamElementComponent implements OnInit {
  socketService = inject(SocketService);
  convertToPropertyPipe = inject(ConvertToPropertyPipe);
  elementUpdate: OutputEmitterRef<{
    event: string;
    elementId: string;
    property: string;
    data: any;
  }> = output();

  elementId = computed(() => this.dataSource().id);
  dataSource: InputSignal<IJamElement> = input.required();
  initialState: IJamElement = {
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
      width: 300,
      height: 300,
    },
    position: {
      x: 400,
      y: 200,
    },
    status: '',
    options: {},
  };
  elementState: SignalState<IJamElement> = signalState(this.initialState);
  jamboardEvents = SocketEvents;

  constructor() {
    effect(
      () => {
        patchState(this.elementState, this.dataSource());
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.socketService
      .onMessage(SocketEvents.JAMBOARD.ELEMENT$)
      .pipe(filter((event) => event.id === this.elementState.id()))
      .subscribe((event) => {
        console.log('event in jamelement', event);
        this.elementUpdate.emit({
          event: event.event,
          elementId: this.elementState.id(),
          property: event.type,
          data: event.data,
        });
        patchState(this.elementState, {
          ...state,
          [this.convertToPropertyPipe.transform(event.event, 'jamboard') ?? '']:
            event.data,
        });
      });
  }

  dispatchEvent(type: string, data: any) {
    console.log(type, data);

    this.socketService.sendMessage(
      SocketEvents.JAMBOARD.ELEMENT$,
      this.elementState().id,
      type,
      data
    );
  }
}
