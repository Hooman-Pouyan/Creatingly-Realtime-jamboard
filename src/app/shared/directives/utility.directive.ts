import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import { filter, fromEvent, race, takeWhile, tap } from 'rxjs';

@Directive({
  selector: '[appUtility]',
  standalone: true,
})
export class UtilityDirectaive {
  // holds and provides shared utilities and data accross business directives
  constructor() {}
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  destoryRef$ = inject(DestroyRef);
  element = this.elementRef.nativeElement;
  isElementBeingResized = signal(false);
  isElementBeingDragged = signal(false);
  mouseLeave$ = fromEvent(this.element, 'mouseLeave');
  mouseMove$ = fromEvent(document, 'mousemove');
  // cancelling the drag&drop process on the first emit from here only if the element was being interacted with
  interactionCancelation$ = race(
    fromEvent(this.element, 'mouseup'),
    fromEvent(document, 'mouseup'),
    fromEvent(document, 'contextmenu')
  ).pipe(
    takeWhile(
      (_) => this.isElementBeingDragged() || this.isElementBeingResized()
    )
  );
}
