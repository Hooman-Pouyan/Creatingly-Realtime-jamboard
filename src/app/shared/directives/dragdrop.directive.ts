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
import {
  IUser,
  TPosition,
} from '../../pages/brainstorming/jamboard/models/jamboard.model';
import { EStatus } from '../../pages/planning/issue-tracking/models/task.models';
import { makeOptional } from '../../core/models/transformers';
import { EJameElementStatus } from '../../pages/brainstorming/jamboard/models/element.model';

export interface DragDropPosition extends TPosition {
  previousPosition?: TPosition;
  isBeingDragged?: boolean;
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
  allowdResizeZone = 20;
  // ---- I/O ----
  latestPosition: InputSignal<DragDropPosition> = input.required();
  positionUpdate: OutputEmitterRef<makeOptional<DragDropPosition>> = output();

  setUpCurrentPosition = effect(
    () => {
      this.positionX.set(this.latestPosition().x);
      this.positionY.set(this.latestPosition().y);
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
    },
    { allowSignalWrites: true }
  );

  constructor() {}
  ngOnInit(): void {
    this.dragMove$.subscribe((move) => {
      this.positionX.set(move.x);
      this.positionY.set(move.y);
      this.renderer.setStyle(this.draggableElement, 'left', move.x + 'px');
      this.renderer.setStyle(this.draggableElement, 'top', move.y + 'px');
      this.renderer.addClass(this.draggableElement, EJameElementStatus.Grabbed);
    });
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'position',
      'absolute'
    );
    this.dargCancelation$
      .pipe(takeUntilDestroyed(this.destoryRef$))
      .subscribe(() => {
        this.renderer.removeClass(
          this.draggableElement,
          EJameElementStatus.Grabbed
        );
        this.positionUpdate.emit({
          x: this.positionX(),
          y: this.positionY(),
          isBeingDragged: false,
        });
      });
  }

  mouseDown$ = fromEvent(this.draggableElement, 'mousedown').pipe(
    filter((event: any) => event.button == 0)
  );
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
        shareReplay({
          bufferSize: 1,
          refCount: true,
        }),
        takeUntilDestroyed(this.destoryRef$),
        map((moveEvent: any) => {
          const offsetX = moveEvent.x - start.offsetX;
          const offsetY = moveEvent.y - start.offsetY;
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
      throttleTime(500),
      // auditTime(500),
      // bufferTime(500),
      tap((elementPosition) => {
        this.positionUpdate.emit({
          isBeingDragged: true,
          x: elementPosition.x ?? this.positionX(),
          y: elementPosition.y ?? this.positionY(),
        });
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
