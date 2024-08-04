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
    elementId: string;
    property: string;
    data: any;
    eventName: string;
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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.socketService
      .onMessage(SocketEvents.JAMBOARD.ELEMENT.POSITION)
      .pipe(filter((event) => event.id === this.elementState.id()))
      .subscribe((event) => {
        console.log('event in jamelement', event);
        this.elementUpdate.emit({
          elementId: this.elementState.id(),
          property:
            this.convertToPropertyPipe.transform(event.event, 'jamboard') ?? '',
          data: event.data,
          eventName: event.event,
        });
        patchState(this.elementState, {
          ...state,
          [this.convertToPropertyPipe.transform(event.event, 'jamboard') ?? '']:
            event.data,
        });
      });
  }

  dispatchEvent(elementId: string, event: string, data: any) {
    this.socketService.sendMessage(elementId, event, data);
  }
}
