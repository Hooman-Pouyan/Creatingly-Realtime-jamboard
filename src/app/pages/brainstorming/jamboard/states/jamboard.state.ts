import { inject, Injectable } from '@angular/core';
import { patchState, SignalState, signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { tap, exhaustMap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { JamBoardService } from '../services/jamboard.service';
import { IJamElement } from '../models/element.model';
import { TModules, IJamComment, IUser } from '../models/jamboard.model';

export interface IJamboardState {
  id: string;
  name: string;
  activeModule: TModules;
  elements: IJamElement[];
  comments: IJamComment[];
  users: IUser[];
  isLoading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class JamboardStore {
  jamboardService = inject(JamBoardService);

  readonly state: SignalState<IJamboardState> = signalState({
    id: '1',
    name: '',
    activeModule: 'brainstorming',
    elements: [],
    comments: [],
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

  readonly loadComments = rxMethod<void>(
    pipe(
      tap(() => patchState(this.state, { isLoading: true })),
      exhaustMap(() => {
        return this.jamboardService.getAllComments(this.state().id).pipe(
          tapResponse({
            next: (comments) => patchState(this.state, { comments: comments }),
            error: console.error,
            finalize: () => patchState(this.state, { isLoading: false }),
          })
        );
      })
    )
  );

  updateState = rxMethod<{ delta: string; data: any }>(
    pipe(
      tap(({ delta, data }) =>
        patchState(this.state, { isLoading: true, [delta]: data })
      )
      // exhaustMap(() => {
      //   return this.jam.getAllElements().pipe(
      //     tapResponse({
      //       next: (Elements) => patchState(this.state, { elements: Elements }),
      //       error: console.error,
      //       finalize: () => patchState(this.state, { isLoading: false }),
      //     })
      //   );
      // })
    )
  );
}
