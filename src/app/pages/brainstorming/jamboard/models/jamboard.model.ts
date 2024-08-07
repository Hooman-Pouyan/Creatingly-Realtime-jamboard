import { TPosition } from './element.model';

export type TModules = 'brainstorming' | 'planning' | 'design';

export interface ICurser {
  id: string;
  color: string;
  position: TPosition;
}

export type TUserStatus = 'online' | 'offline' | 'stale' | 'editting';

export interface IJamUser extends IUser {}

export interface IJamComment {
  id: string;
  content: string;
  user: Pick<IJamUser, 'id' | 'name' | 'avatarUrl'>;
  dateTime: Date;
  position: TPosition;
}

export interface IUser {
  id: string;
  name: string;
  email?: string;
  status: TUserStatus;
  avatarUrl: string;
  curser: Exclude<IUserCursor, 'id'>;
  activeModule?: TModules | false;
}

export interface IUserCursor {
  id: string;
  position: TModulePosition;
  actions: TCursorActions;
  color: string;
}

export type TModulePosition = TPosition & {
  projectId: string;
  moduleName: TModules;
};

export type IUserCursorState = {
  id: string;
  position: TPosition;
  actions: TCursorActions;
};

export type TCursorActions =
  | 'move'
  | 'resize'
  | 'click'
  | 'drag'
  | 'drop'
  | 'delete';

export { TPosition };
