export interface ITask {
  id: string;
  title: string;
  description: string;
  reporter: string;
  assignee: string;
  storyPoint: number;
  ramainingTime: number;
  status: EStatus;
  isClosed: boolean;
  isInActiveSprint: boolean;
  priority: EPriorities;
  team: ETeams;
  board: EBoard;
}
export interface IFilter {
  id: string;
  name: string;
  type: string;
  label: string;
  description: string;
}

export enum EPriorities {
  veryhigh = 'very-high',
  high = 'high',
  medium = 'medium',
  lowh = 'low',
  verylow = 'very-low',
}
export enum EStatus {
  todo = 'To-Do',
  inprogress = 'In-Progress',
  done = 'Done',
  blocked = 'Blocked',
}
export enum EBoard {
  website = 'Website',
  mobile = 'Mobile-App',
  thirdparty = 'Third-Party',
  dashboard = 'Dashboard',
}

export enum ETeams {
  frontend = 'frontend',
  backend = 'backend',
  ui = 'ui/ux',
  infra = 'infra',
  product = 'product',
  Marketing = 'Marketing',
  seo = 'seo',
}
