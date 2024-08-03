import { Routes } from '@angular/router';

export const IssueTrackingRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./issue-tracking.component').then(
        (c) => c.IssueTrackingComponent
      ),
  },
  {
    path: 'board',
    loadComponent: () =>
      import('./components/board/board.component').then(
        (c) => c.BoardComponent
      ),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./components/task/task.component').then((c) => c.TaskComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./components/task/detail/detail.component').then(
            (c) => c.DetailComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./components/task/addit/addit.component').then(
            (c) => c.AdditComponent
          ),
      },
      {
        path: 'update/:id',
        loadComponent: () =>
          import('./components/task/addit/addit.component').then(
            (c) => c.AdditComponent
          ),
      },
    ],
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./issue-tracking.component').then(
        (c) => c.IssueTrackingComponent
      ),
  },
];
