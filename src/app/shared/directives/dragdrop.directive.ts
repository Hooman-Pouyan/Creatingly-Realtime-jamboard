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
  catchError,
  debounceTime,
  filter,
  fromEvent,
  map,
  Observable,
  of,
  race,
  shareReplay,
  skipUntil,
  switchMap,
  takeUntil,
  takeWhile,
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
import { UtilityDirectaive } from './utility.directive';
import { LayoutService } from '../../core/layout/services/layout.service';

export interface DragDropPosition extends TPosition {
  previousPosition?: TPosition;
  isBeingDragged?: boolean;
}

@Directive({
  selector: '[canDragdrop]',
  standalone: true,
  providers: [UtilityDirectaive],
})
export class DragdropDirective implements OnInit {
  baseDirective = inject(UtilityDirectaive);
  layoutService = inject(LayoutService);
  // currentPosition = signalState({});
  // ---- specific ----
  draggableElement = this.baseDirective.element;
  // ---- states ----
  positionX: WritableSignal<number> = signal(0);
  positionY: WritableSignal<number> = signal(0);
  allowdResizeZone = 20;
  // ---- I/O ----
  latestPosition: InputSignal<DragDropPosition> = input.required();
  positionUpdate: OutputEmitterRef<makeOptional<DragDropPosition>> = output();

  mouseDown$ = fromEvent(this.draggableElement, 'mousedown').pipe(
    // to only apply drag and drop on primary mouse button
    filter((event: any) => event.button == 0)
  );

  setUpCurrentPosition = effect(
    () => {
      this.updatePosition(this.latestPosition().x, this.latestPosition().y);
    },
    { allowSignalWrites: true }
  );

  constructor() {}
  ngOnInit(): void {
    this.baseDirective.renderer.setStyle(
      this.baseDirective.element,
      'position',
      'absolute'
    );
    this.dragMove$.subscribe({
      next: (move) => {
        this.baseDirective.isElementBeingDragged.set(true);
        this.updatePosition(move.x, move.y);
      },
      error: (err) => catchError(err),
      complete: () => {},
    });

    this.baseDirective.interactionCancelation$.subscribe({
      next: () => {
        console.log('drag drop cancelled');

        this.baseDirective.renderer.addClass(
          this.draggableElement,
          'isDropped'
        );
        
        this.positionUpdate.emit({
          x: this.positionX(),
          y: this.positionY(),
          isBeingDragged: false,
        });
      },
      error: (err) => catchError(err),
      complete: () => this.baseDirective.isElementBeingDragged.set(false),
    });
  }

  dragStart$ = this.mouseDown$;
  dragMove$ = this.dragStart$.pipe(
    // filter(
    //   (mouseMove: any) =>
    //     // to make sure element can not be dragged from the edges of the element where it can be resized (for future when we show resized handler ui in all 8 directions on element)
    //     // !this.isValidForDrag(mouseMove.offsetX, mouseMove.offsetY)
    // ),
    filter((event) => !event.target.classList.contains('resizeHandler')),
    takeUntilDestroyed(this.baseDirective.destoryRef$),
    switchMap((start: any) =>
      this.baseDirective.mouseMove$.pipe(
        // to make sure if we had more than 1 subscription to an event only one is created and shred among all
        // and it's unsubscribed when destroyed
        shareReplay({
          bufferSize: 1,
          refCount: true,
        }),
        // we put takeuntil here because the wont destroy inner observables so we made sure we destory move event sub
        takeUntilDestroyed(this.baseDirective.destoryRef$),
        takeUntil(this.baseDirective.interactionCancelation$),
        skipUntil(
          this.baseDirective.mouseHold$.pipe(
            tap(() => {
              this.baseDirective.renderer.addClass(
                this.draggableElement,
                EJameElementStatus.Grabbed
              );
            })
          )
        ),
        map((moveEvent: any) => {
          const offsetX = moveEvent.x - start.offsetX;
          const offsetY = moveEvent.y - start.offsetY;
          return {
            x: offsetX,
            y: offsetY,
          };
        })
      )
    )
  );

  emitLatestPosition = this.dragMove$
    .pipe(
      // any of these can be used based on needs, they do the same thing in different ways
      throttleTime(300),
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

  updatePosition(x: number, y: number) {
    this.positionX.set(x);
    this.positionY.set(y);
    this.baseDirective.renderer.setStyle(
      this.draggableElement,
      'left',
      x - this.layoutService.offsetX() + 'px'
    );
    this.baseDirective.renderer.setStyle(
      this.draggableElement,
      'top',
      y - this.layoutService.offsetY() + 'px'
    );
    // this.baseDirective.renderer.addClass(
    //   this.draggableElement,
    //   EJameElementStatus.Grabbed
    // );
  }

  isValidForDrag(offsetX: number, offsetY: number): boolean {
    return (
      offsetX < this.allowdResizeZone ||
      offsetY < this.allowdResizeZone ||
      offsetX > this.draggableElement.clientWidth - this.allowdResizeZone ||
      offsetY > this.draggableElement.clientHeight - this.allowdResizeZone
    );
  }
}
