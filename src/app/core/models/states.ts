import { Signal } from '@angular/core';
import { SignalState } from '@ngrx/signals';
import { IJamboardState } from '../../pages/brainstorming/jamboard/jamboard.component';
import { IUsersState } from '../authentication/auth.service';

export type TStates = {
  jambaord: SignalState<IJamboardState>;
  userStore: SignalState<IUsersState>;
};

export type IAppState = {
  [state in keyof TStates]: TStates[state];
};
