import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import {
  buffer,
  debounceTime,
  filter,
  fromEvent,
  interval,
  map,
  race,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  timer,
} from 'rxjs';

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
  mouseClick$ = fromEvent(document, 'click');
  mouseHold$ = fromEvent(document, 'mousedown').pipe(
    switchMap(() => timer(500).pipe(takeUntil(fromEvent(document, 'mouseup')))),
    filter(() => true)
  );
  doubleClick$ = this.mouseClick$.pipe(
    buffer(this.mouseClick$.pipe(debounceTime(250))),
    map((clicks) => clicks.length),
    filter((clicksLength) => clicksLength >= 2)
  );

  // cancelling the drag&drop process on the first emit from here only if the element was being interacted with
  interactionCancelation$ = race(
    fromEvent(this.element, 'mouseup'),
    fromEvent(document, 'mouseup'),
    fromEvent(document, 'contextmenu'),
    this.doubleClick$
  ).pipe(
    takeWhile(
      (_) => this.isElementBeingDragged() || this.isElementBeingResized()
    )
  );
}
