import { Component, computed, input, InputSignal } from '@angular/core';
import { SignalState, signalState, withState } from '@ngrx/signals';
import { EElementStatus, IJamElement } from '../../models/element.model';

@Component({
  selector: 'app-base-jam-element',
  standalone: true,
  imports: [],
  templateUrl: './base-jam-element.component.html',
  styleUrl: './base-jam-element.component.scss',
})
export class BaseJamElementComponent {
  elementId = computed(() => this.dataSource().id);
  dataSource: InputSignal<IJamElement> = input({} as IJamElement);
  initialState: IJamElement = {
    id: '',
    info: {},
    appearence: {},
    position: {
      x: 200,
      y: 200,
    },
    size: {
      width: 300,
      height: 300,
    },
    status: '',
  };
  elementState: SignalState<IJamElement> = signalState(this.initialState);
}
