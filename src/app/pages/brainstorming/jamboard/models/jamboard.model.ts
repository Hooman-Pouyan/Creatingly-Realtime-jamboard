import { TPosition } from './element.model';

export type TModules = 'jamboard' | 'planning' | 'design';

export interface ICurser {
  id: string;
  color: string;
  position: TPosition;
}

export type TUserStatus = 'online' | 'offline' | 'stale' | 'editting';

export interface IJamUser extends IUser {}

export interface IUser {
  id: string;
  name: string;
  email?: string;
  curser: ICurser;
  status: TUserStatus;
  avatarUrl: string;
  activeModule?: TModules | false;
}

export { TPosition };
