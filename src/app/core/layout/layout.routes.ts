import { Routes } from '@angular/router';

export const LayoutRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'planning',
        loadChildren: () =>
          import('../../pages/planning/planning.routes').then(
            (m) => m.planningRoutes
          ),
      },
      {
        path: 'design',
        loadChildren: () =>
          import('../../pages/design/design.routes').then(
            (m) => m.DesignRoutes
          ),
      },
      {
        path: 'brainstorming',
        loadChildren: () =>
          import('../../pages/brainstorming/brainstorm.routes').then(
            (m) => m.BrainstormingRoutes
          ),
      },
    ],
  },
];
