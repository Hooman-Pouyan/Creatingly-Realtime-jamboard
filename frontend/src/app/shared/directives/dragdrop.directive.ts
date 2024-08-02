import {
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  output,
  OutputEmitterRef,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { signalState } from '@ngrx/signals';
import {
  debounceTime,
  fromEvent,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Directive({
  selector: '[appDragdrop]',
  standalone: true,
})
export class DragdropDirective implements OnInit {
  // currentPosition = signalState({});
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  positionX: WritableSignal<number> = signal(0);
  positionY: WritableSignal<number> = signal(0);
  draggableElement = this.elementRef.nativeElement;
  destoryRef$ = inject(DestroyRef);

  positionUpdate: OutputEmitterRef<{ clientX: string; clientY: string }> =
    output();

  constructor() {}
  ngOnInit(): void {
    this.dragMove$.subscribe((move) => {
      const offsetX = move.originalEvent.x - move.startOffsetX;
      const offsetY = move.originalEvent.y - move.startOffsetY;
      this.positionX.set(offsetX);
      this.positionX.set(offsetY);
      this.renderer.setStyle(this.draggableElement, 'left', offsetX + 'px');
      this.renderer.setStyle(this.draggableElement, 'top', offsetY + 'px');
    });
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'position',
      'absolute'
    );
    // this.renderer.setAttribute(
    //   this.elementRef.nativeElement,
    //   'draggable',
    //   'true'
    // );
    // fromEvent(document, 'mousemove').subscribe(console.log);
  }

  mouseDown$ = fromEvent(this.draggableElement, 'mousedown');
  mouseMove$ = fromEvent(this.draggableElement, 'mousemove');
  mouseUp$ = fromEvent(document, 'mouseup');

  dragStart$ = this.mouseDown$;
  dragMove$ = this.dragStart$.pipe(
    // whenever we press mouse down
    switchMap((start: any) =>
      this.mouseMove$.pipe(
        // each time we move a cursor
        map((moveEvent: any) => ({
          originalEvent: moveEvent,
          deltaX: moveEvent.pageX - start.pageX,
          deltaY: moveEvent.pageY - start.pageY,
          startOffsetX: start.offsetX,
          startOffsetY: start.offsetY,
        })),
        takeUntil(this.mouseUp$) // but only until we release the mouse button
      )
    )
  );

  emitOutput = this.dragMove$
    .pipe(
      debounceTime(20),
      tap((a) => this.positionUpdate.emit(a as any))
    )
    .subscribe();
}
