import { Routes } from '@angular/router';

export const DesignRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../design/canvas/canvas.component').then(
        (c) => c.CanvasComponent
      ),
  },
];
