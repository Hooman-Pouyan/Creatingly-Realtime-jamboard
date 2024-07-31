// #### extends can be used to both check the key label or the type in conditional typing

export type Optional<T> = {
  [key in keyof T]: key extends number | 'title' | 'taskId'
    ? T[key]
    : T[key] | undefined;
};

export type makeOptional<T> = {
  [key in keyof T]?: T[key];
};
export enum EOrder {
  asc = 'Asc',
  desc = 'Desc',
}
export type TQuery = makeOptional<{
  title: string;
  reporter: string;
  assignee: string;
  taskId: number;
  modifiedAt: Date;
  createAt: Date;
  isClosed: boolean;
  isActive: boolean;
}>;
