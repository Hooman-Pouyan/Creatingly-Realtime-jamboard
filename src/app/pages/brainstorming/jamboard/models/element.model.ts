import { makeOptional } from '../../../../core/models/transformers';
import { IUser } from './jamboard.model';

export type IElement = {
  appearence: IAppearence;
};

export type IElementData = {
  id: string;
  content: IElementContent;
  info: IElementInfo;
};

export type IElementContent = {
  title: string;
  content: string;
};

export type IElementInfo = {
  createAt: Date;
  modifiedAt: Date;
  createdBy: IUser;
  modifiedBy: IUser;
};

export type IAppearence = makeOptional<{
  width: number;
  height: number;
  opacity: number;
  pinned: boolean;
  draggable: boolean;
  dropBasedOnGrid: boolean;
}>;
export { IUser };
  
  

