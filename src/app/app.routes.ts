import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/layout/layout.routes').then((m) => m.LayoutRoutes),
  },
];
