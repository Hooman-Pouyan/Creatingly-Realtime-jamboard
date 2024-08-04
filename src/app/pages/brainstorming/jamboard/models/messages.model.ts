import { IJamElement } from './element.model';

export type IJamElementSocketMessage = {
  id: string;
  type: IJamElementEventType;
  data: any;
};

export enum IJamElementEventType {
  Position = 'position',
  Size = 'size',
  Appearence = 'appearence',
  Info = 'info',
  Status = 'status',
}
