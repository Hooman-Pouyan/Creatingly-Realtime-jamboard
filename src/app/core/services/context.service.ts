import { Injectable, signal, TemplateRef, WritableSignal } from '@angular/core';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

export interface IContextAction {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  constructor() {}

  dropDownTemplateRef: WritableSignal<NzDropdownMenuComponent | undefined> =
    signal(undefined);

  contextAction: WritableSignal<{ type: string; id: string } | undefined> =
    signal(undefined);

  createContextAction(action: string, elementId: string) {
    this.contextAction.set({ type: action, id: elementId });
  }
}
