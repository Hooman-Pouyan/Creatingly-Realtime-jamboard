export type TModules = 'jamboard' | 'planning' | 'design';

export interface ICurser {
  id: string;
  color: string;
  position: TPosition;
}

export type TStatus = 'online' | 'offline' | 'stale' | 'editting';
export type TPosition = { x: number; y: number };

export interface IJamUser extends IUser {}

export interface IUser {
  id: string;
  name: string;
  email: string;
  curser: ICurser;
  status: TStatus;
  activeModule: TModules | false;
}

export type TSize = { width: number; height: number };
