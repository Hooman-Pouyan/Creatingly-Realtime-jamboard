import { Directive, inject, ViewContainerRef } from '@angular/core';
import { DragdropDirective } from './dragdrop.directive';

@Directive({
  selector: '[canInsert]',
  standalone: true,
  hostDirectives: [
    {
      directive: DragdropDirective,
      inputs: ['latestPosition'],
      outputs: ['positionUpdate'],
    },
  ],
})
export class InsertComponentDirective {
  dragDropDirective = inject(DragdropDirective);

  constructor(public viewContainerRef: ViewContainerRef) {}
}
