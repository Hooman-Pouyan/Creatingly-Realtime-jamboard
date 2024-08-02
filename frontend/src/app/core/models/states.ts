import { Signal } from "@angular/core";

export type IAppState = {
  [name: string]: Signal<unknown>;
};
