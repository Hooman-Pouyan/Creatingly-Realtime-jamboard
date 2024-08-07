import { Injectable, signal, TemplateRef, WritableSignal } from '@angular/core';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Injectable({
  providedIn: 'root',
})
export class ContextServiceService {
  constructor() {}

  dropDownTemplateRef: WritableSignal<NzDropdownMenuComponent | undefined> =
    signal(undefined);
  
  addComment(comment: string) {
    console.log(comment);
  }
}
