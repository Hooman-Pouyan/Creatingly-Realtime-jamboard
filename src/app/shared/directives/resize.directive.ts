import {
  AfterViewInit,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnInit,
  Output,
  output,
  OutputEmitterRef,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  iif,
  map,
  Observable,
  of,
  OperatorFunction,
  race,
  shareReplay,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  throttleTime,
} from 'rxjs';
import { makeOptional } from '../../core/models/transformers';
import { TSize } from '../../pages/brainstorming/jamboard/models/element.model';
import { UtilityDirectaive } from './utility.directive';

export interface IResizeData extends TSize {
  isBeingResized?: boolean;
  direction?: EResizeDirections;
}

export enum EResizeDirections {
  Ediagonal = 'nwse-resize',
  Wdiagonal = 'nesw-resize',
  horizontal = 'col-resize',
  vertical = 'row-resize',
}
@Directive({
  selector: '[canResize]',
  standalone: true,
  providers: [UtilityDirectaive],
})
export class ResizeDirective implements OnInit, AfterViewInit {
  baseDirective = inject(UtilityDirectaive);
  // ---- specific ----
  resizableElement = this.baseDirective.element;
  resizableElementRect: WritableSignal<DOMRect> = signal({} as DOMRect);
  resizeZoneGap = 50;
  // ---- states ----
  width: WritableSignal<number> = signal(0);
  height: WritableSignal<number> = signal(0);
  // ---- I/O ----
  sizeUpdate: OutputEmitterRef<makeOptional<IResizeData>> = output();
  latestSize: InputSignal<IResizeData> = input({ width: 300, height: 300 });
  minAllowedSize: InputSignal<number> = input.required();
  maxAllowedSize: InputSignal<number> = input.required();
  resizeHandler!: any;

  mouseDown$ = fromEvent(this.resizableElement, 'mousedown').pipe(
    filter((event: any) => event.button == 0)
  );
  ngOnInit(): void {
    this.resizeStart$.subscribe({
      next: (size: IResizeData) => {
        this.baseDirective.isElementBeingResized.set(true);
        this.updateSize(size);
      },
      error: (err) => catchError(err),
    });

    this.baseDirective.interactionCancelation$.subscribe({
      next: () => {
        console.log('eidhshdiugdigd');

        this.baseDirective.renderer.removeClass(
          this.resizableElement,
          'resized'
        );
        this.sizeUpdate.emit({
          width: this.width(),
          height: this.height(),
          isBeingResized: false,
        });
      },
      error: (err) => catchError(err),
      complete: () => this.baseDirective.isElementBeingResized.set(false),
    });
    this.drawResizeHandler();
  }

  ngAfterViewInit(): void {
    // the element's Rect is available in this lifecycle
    this.resizableElementRect.set(
      this.baseDirective.element.getBoundingClientRect()
    );
  }

  setupSize = effect(
    () => {
      this.updateSize(this.latestSize());
    },
    { allowSignalWrites: true }
  );

  drawResizeHandler() {
    this.resizeHandler = document.createElement('span');
    this.resizeHandler.className = 'resizeHandler';
    this.baseDirective.renderer.appendChild(
      this.resizableElement,
      this.resizeHandler
    );
  }

  updateSize(size: IResizeData) {
    this.width.set(size.width);
    this.height.set(size.height);
    this.baseDirective.renderer.setStyle(
      this.resizableElement,
      'width',
      `${size.width}px`
    );
    this.baseDirective.renderer.setStyle(
      this.resizableElement,
      'height',
      `${size.height}px`
    );
    this.baseDirective.renderer.addClass(this.resizableElement, 'resized');
  }

  resizeStart$ = this.mouseDown$.pipe(
    filter((event) => event.target.classList.contains('resizeHandler')),
    switchMap((mouseMove: any) => {
      const firstWidth = this.resizableElement.clientWidth;
      const firstHeight = this.resizableElement.clientHeight;
      const firstMouseX = mouseMove.clientX;
      const firstMosueY = mouseMove.clientY;

      return this.baseDirective.mouseMove$.pipe(
        tap(() =>
          this.resizableElementRect.set(
            this.baseDirective.element.getBoundingClientRect()
          )
        ),
        shareReplay({
          bufferSize: 1,
          refCount: true,
        }),
        filter((mouseMove: any) =>
          this.isValidForResize(mouseMove.x, mouseMove.y)
        ),
        // debounceTime(10),
        map((move: any) => ({
          width: Number(firstWidth + (move.clientX - firstMouseX)),
          height: Number(firstHeight + (move.clientY - firstMosueY)),
        })),
        filter((size: IResizeData) =>
          this.isInAllowedResizeRange(size.width, size.height)
        ),
        distinctUntilChanged(
          (a: IResizeData, b: IResizeData) =>
            a.width === b.width && a.height === b.height
        ),
        takeUntil(this.baseDirective.interactionCancelation$),
        takeUntilDestroyed(this.baseDirective.destoryRef$)
      );
    })
  );

  isInAllowedResizeRange(width: number, height: number): boolean {
    return (
      width > this.minAllowedSize() &&
      height > this.minAllowedSize() &&
      width < this.maxAllowedSize() &&
      height < this.maxAllowedSize()
    );
  }

  isValidForResize(offsetX: number, offsetY: number): boolean {
    return (
      Math.abs(
        offsetY -
          this.resizableElementRect().y -
          this.resizableElementRect().height
      ) < this.resizeZoneGap &&
      Math.abs(
        offsetX -
          this.resizableElementRect().x -
          this.resizableElementRect().width
      ) < this.resizeZoneGap
    );
  }

  emitLatestSize = this.resizeStart$
    .pipe(
      throttleTime(300),
      tap((elementPosition) => {
        this.sizeUpdate.emit({
          width:
            elementPosition.width != 0 ? elementPosition.width : this.width(),
          height:
            elementPosition.height != 0
              ? elementPosition.height
              : this.height(),
          direction: EResizeDirections.Ediagonal,
          isBeingResized: true,
        });
      })
    )
    .subscribe();
}
