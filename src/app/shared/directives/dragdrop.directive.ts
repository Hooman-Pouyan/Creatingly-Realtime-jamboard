import {
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  input,
  InputSignal,
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
  filter,
  fromEvent,
  map,
  Observable,
  of,
  race,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs';

export interface DragDropPosition {
  x: number;
  y: number;
}

@Directive({
  selector: '[canDragdrop]',
  standalone: true,
})
export class DragdropDirective implements OnInit {
  // currentPosition = signalState({});
  // ---- APIs ----
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  destoryRef$ = inject(DestroyRef);
  // ---- specific ----
  draggableElement = this.elementRef.nativeElement;
  // ---- states ----
  positionX: WritableSignal<number> = signal(0);
  positionY: WritableSignal<number> = signal(0);
  allowdResizeZone = 5;
  // ---- I/O ----
  latestPosition: InputSignal<DragDropPosition> = input({ x: 300, y: 300 });
  positionUpdate: OutputEmitterRef<DragDropPosition> = output();

  setUpCurrentPosition = effect(() => {
    this.renderer.setStyle(
      this.draggableElement,
      'left',
      this.latestPosition().x + 'px'
    );
    this.renderer.setStyle(
      this.draggableElement,
      'top',
      this.latestPosition().y + 'px'
    );
  });

  constructor() {}
  ngOnInit(): void {
    this.dragMove$.subscribe((move) => {
      this.positionX.set(move.x);
      this.positionY.set(move.y);
      this.renderer.setStyle(
        this.draggableElement,
        'left',
        this.positionX() + 'px'
      );
      this.renderer.setStyle(
        this.draggableElement,
        'top',
        this.positionY() + 'px'
      );
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
  mouseMove$ = fromEvent(document, 'mousemove');
  dargCancelation$ = race(
    fromEvent(this.draggableElement, 'mouseup'),
    fromEvent(document, 'mouseup'),
    fromEvent(document, 'contextmenu')
  );

  dragStart$ = this.mouseDown$;
  dragMove$ = this.dragStart$.pipe(
    filter(
      (mouseMove: any) =>
        !this.isValidForDrag(mouseMove.offsetX, mouseMove.offsetY)
    ),
    takeUntilDestroyed(this.destoryRef$),
    switchMap((start: any) =>
      this.mouseMove$.pipe(
        map((moveEvent: any) => {
          const offsetX = moveEvent.x - start.offsetX;
          const offsetY = moveEvent.y - start.offsetX;
          return {
            x: offsetX,
            y: offsetY,
          };
        }),
        takeUntil(this.dargCancelation$)
      )
    )
  );

  emitLatestPosition = this.dragMove$
    .pipe(
      takeUntilDestroyed(this.destoryRef$),
      throttleTime(50),
      tap((elementPosition) => {
        this.positionUpdate.emit(elementPosition);
      })
    )
    .subscribe();

  isValidForDrag(offsetX: number, offsetY: number): boolean {
    return (
      offsetX < this.allowdResizeZone ||
      offsetY < this.allowdResizeZone ||
      offsetX > this.draggableElement.clientWidth - this.allowdResizeZone ||
      offsetY > this.draggableElement.clientHeight - this.allowdResizeZone
    );
  }
}