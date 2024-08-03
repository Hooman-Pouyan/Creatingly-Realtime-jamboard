import { Routes } from '@angular/router';

export const planningRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./issue-tracking/issue-tracking.routes').then(
        (m) => m.IssueTrackingRoutes
      ),
  },
];
