import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
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
import { JamBoardRepository } from '../../../../../core/repositories/jamboard.repository';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../../core/authentication/auth.service';
import { DragdropDirective } from '../../../../../shared/directives/dragdrop.directive';

@Component({
  selector: 'app-base-element',
  standalone: true,
  imports: [ConvertToPropertyPipe, DragdropDirective],
  templateUrl: './base-element.component.html',
  styleUrl: './base-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseElementComponent implements OnInit {
  socketService = inject(SocketService);
  jamboardRepo = inject(JamBoardRepository);
  authService = inject(AuthService);
  convertToPropertyPipe = inject(ConvertToPropertyPipe);
  elementUpdate: OutputEmitterRef<{
    event: string;
    elementId: string;
    property: string;
    data: any;
  }> = output();
  initialState: IJamElement = {
    id: '1',
    appearence: {},
    content: {
      title: 'text',
      text: 'hi',
      imageUrl: 'aa',
    },
    info: {},
    type: 'note',
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
  elementId = computed(() => this.dataSource().id);
  dataSource: InputSignal<IJamElement> = input(this.initialState);
  elementState: SignalState<IJamElement> = signalState(this.dataSource());
  jamboardEvents = SocketEvents;
  destroyRef$ = inject(DestroyRef);

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
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        filter(
          (event) =>
            event.id === this.elementState.id() &&
            event.userId !== this.authService.usersStore$.userProfile()?.id
        )
      )
      .subscribe((event) => {
        this.elementUpdate.emit({
          event: event.event,
          elementId: this.elementState.id(),
          property: event.type,
          data: event.data,
        });
        patchState(this.elementState, {
          ...state,
          [event.type]: event.data,
        });
      });
  }

  updateState(delta: string, newDeltaData: any) {
    // updates the state of element
    patchState(this.elementState, (state) => ({
      [delta]: newDeltaData,
    }));
    console.log(newDeltaData);

    // checks if the user interaxction with elements is done and if so send http request to the repo
    if (!newDeltaData.isBeingDragged && !newDeltaData.isBeingResized)
      this.sendRepoRequest(delta);

    // emits socket message
    this.dispatchEvent(delta, (this.elementState as any)()[delta]);
  }

  dispatchEvent(delta: string, newDeltaData: any) {
    this.socketService.sendMessage(
      SocketEvents.JAMBOARD.ELEMENT$,
      this.elementState().id,
      delta,
      newDeltaData
    );
  }

  sendRepoRequest(delta: string) {
    // jamboard id should be dynamic but for now it is hardcoded till we add different tabs for a jamboard
    this.jamboardRepo
      .updateElement('1', this.elementState().id, {
        [delta]: (this.elementState() as any)[delta],
      })
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe();
  }
}
