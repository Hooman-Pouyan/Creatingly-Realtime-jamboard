import { Directive, inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DragdropDirective } from './dragdrop.directive';

@Directive({
  selector: '[appUtility]',
  standalone: true,
})
export class UtilityDirectaive {
  constructor() {}

  // mouseDown$ = fromEvent(this.element, 'mousedown');
  // mouseMove$ = fromEvent(document, 'mousemove');
  // dargCancelation$ = race(
  //   fromEvent(this.element, 'mouseup'),
  //   fromEvent(document, 'mouseup'),
  //   fromEvent(document, 'contextmenu')
  // );
}
