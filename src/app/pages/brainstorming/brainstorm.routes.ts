import { Routes } from '@angular/router';

export const BrainstormingRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./jamboard/jamboard.component').then((c) => c.JamboardComponent),
  },
];
