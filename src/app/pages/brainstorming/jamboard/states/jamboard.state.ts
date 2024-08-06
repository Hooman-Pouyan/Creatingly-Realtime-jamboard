import { inject, Injectable } from '@angular/core';
import { IJamboardState } from '../jamboard.component';
import { patchState, SignalState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { tap, exhaustMap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { JamBoardService } from '../services/jamboard.service';
@Injectable({
  providedIn: 'root',
})
export class JamboardStore {
  jamboardService = inject(JamBoardService);

  readonly state: SignalState<IJamboardState> = signalState({
    id: '1',
    name: '',
    elements: [],
    users: [],
    isLoading: false,
  });

  readonly loadElements = rxMethod<void>(
    pipe(
      tap(() => patchState(this.state, { isLoading: true })),
      exhaustMap(() => {
        return this.jamboardService.getAllElements().pipe(
          tapResponse({
            next: (Elements) => patchState(this.state, { elements: Elements }),
            error: console.error,
            finalize: () => patchState(this.state, { isLoading: false }),
          })
        );
      })
    )
  );
}
