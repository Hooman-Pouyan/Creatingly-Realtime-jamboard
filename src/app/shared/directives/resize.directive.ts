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
  hostDirectives: [],
})
export class ResizeDirective implements OnInit, AfterViewInit {
  // ---- APIs ----
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  destoryRef$ = inject(DestroyRef);
  // ---- specific ----
  resizableElement = this.elementRef.nativeElement;
  resizableElementRect: WritableSignal<DOMRect> = signal({} as DOMRect);
  resizeZoneGap = 30;
  // ---- states ----
  width: WritableSignal<number> = signal(0);
  height: WritableSignal<number> = signal(0);
  // ---- I/O ----
  sizeUpdate: OutputEmitterRef<makeOptional<IResizeData>> = output();
  latestSize: InputSignal<IResizeData> = input({ width: 300, height: 300 });
  minAllowedSize: InputSignal<number> = input.required();
  maxAllowedSize: InputSignal<number> = input.required();
  resizeHandler!: any;

  mouseDown$ = fromEvent(this.resizableElement, 'mousedown');
  mouseLeave$ = fromEvent(this.resizableElement, 'mouseLeave');
  mouseMove$ = fromEvent(document, 'mousemove');
  resizeCancelation$ = race(
    fromEvent(this.resizableElement, 'mouseup'),
    fromEvent(document, 'mouseup'),
    fromEvent(document, 'contextmenu')
  );

  ngOnInit(): void {
    this.resizeStart$.subscribe({
      next: (size: IResizeData) => this.updateSize(size),
      error: (err) => catchError(err),
    });

    this.resizeCancelation$.subscribe(() => {
      this.renderer.removeClass(this.resizableElement, 'resized');
      this.sizeUpdate.emit({
        width: this.width(),
        height: this.height(),
        isBeingResized: false,
      });
    });
    this.drawResizeHandler();
    // this.listenToCurserPosition().subscribe();
  }

  ngAfterViewInit(): void {
    this.resizableElementRect.set(
      this.elementRef.nativeElement.getBoundingClientRect()
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
    this.renderer.appendChild(this.resizableElement, this.resizeHandler);
  }

  updateSize(size: IResizeData) {
    this.width.set(size.width);
    this.height.set(size.height);
    this.renderer.setStyle(this.resizableElement, 'width', `${size.width}px`);
    this.renderer.setStyle(this.resizableElement, 'height', `${size.height}px`);
    this.renderer.addClass(this.resizableElement, 'resized');
  }

  // listenToCurserPosition(): Observable<string> {
  //   return fromEvent(this.resizableElement, 'mouseover').pipe(
  //     switchMap(() =>
  //       fromEvent(this.resizableElement, 'mousemove').pipe(
  //         tap((e: any) => {
  //           console.log({
  //             mousex: e.x,
  //             mouseY: e.y,
  //             elX: this.resizableElementBoundings().x,
  //             elY: this.resizableElementBoundings().y,
  //           });
  //         }),
  //         takeUntil(this.mouseLeave$),
  //         filter((event: any) => this.isCurserOnTheEdge(event.x, event.y))
  //         // map(() => 'resized')
  //       )
  //     )
  //   );
  // }

  // isCurserOnTheEdge(offsetX: number, offsetY: number): boolean {
  //   console.log(offsetX, offsetY);

  //   return this.resizableElementBoundings().x - offsetX < 10;
  // }

  resizeStart$ = this.mouseDown$.pipe(
    switchMap((mouseMove: any) => {
      const firstWidth = this.resizableElement.clientWidth;
      const firstHeight = this.resizableElement.clientHeight;
      const firstMouseX = mouseMove.clientX;
      const firstMosueY = mouseMove.clientY;
      return this.mouseMove$.pipe(
        tap(() =>
          this.resizableElementRect.set(
            this.elementRef.nativeElement.getBoundingClientRect()
          )
        ),
        shareReplay({
          bufferSize: 1,
          refCount: true,
        }),
        takeUntilDestroyed(this.destoryRef$),
        takeUntil(this.resizeCancelation$),
        filter(
          (mouseMove: any) => this.isValidForResize(mouseMove.x, mouseMove.y),
          !this.resizableElement.classList.contains('dragged')
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
        takeUntil(this.resizeCancelation$)
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
    // console.log(!this.resizableElement.classList.contains('dragged'));

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
    // switch (true) {
    //   case offsetX <= this.resizeZoneGap:
    //     return EResizeDirections.horizontal;
    //   case offsetY <= this.resizeZoneGap:
    //     return EResizeDirections.vertical;
    //   case offsetX <= this.resizeZoneGap && offsetY >= this.allowdYResizeGap:
    //     return EResizeDirections.Wdiagonal;
    //   case offsetX >= this.allowdXResizeGap && offsetY <= this.resizeZoneGap:
    //     return EResizeDirections.Ediagonal;
    //     // case offsetX >= this.allowdXResizeGap && offsetY >= this.allowdYResizeGap:
    //     //   console.log('5');
    //     return EResizeDirections.Wdiagonal;
    //   case offsetX <= this.resizeZoneGap && offsetY <= this.resizeZoneGap:
    //     return EResizeDirections.Ediagonal;
    //   default:
    //     return false;
    // }
  }

  emitLatestSize = this.resizeStart$
    .pipe(
      takeUntilDestroyed(this.destoryRef$),
      takeUntil(this.resizeCancelation$),
      throttleTime(500),
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
