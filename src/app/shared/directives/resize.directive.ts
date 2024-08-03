import {
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
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  OperatorFunction,
  race,
  switchMap,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs';

export interface IResizeData {
  width: number;
  height: number;
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
export class ResizeDirective implements OnInit {
  ngOnInit(): void {
    this.resizeStart$.subscribe({
      next: (size: IResizeData) => this.setupSize(size),
    });
  }

  setupInitialSize = effect(() => {
    this.setupSize(this.latestSize());
  });

  setupSize(size: IResizeData) {
    this.renderer.setStyle(this.resizableElement, 'width', `${size.width}px`);
    this.renderer.setStyle(this.resizableElement, 'height', `${size.height}px`);
  }

  // ---- APIs ----
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  destoryRef$ = inject(DestroyRef);
  // ---- specific ----
  resizableElement = this.elementRef.nativeElement;
  resizableElementBoundings =
    this.elementRef.nativeElement.getBoundingClientRect();
  resizeZoneGap = 5;
  allowdXResizeGap = this.resizableElement.clientWidth - this.resizeZoneGap;
  allowdYResizeGap = this.resizableElement.clientHeight - this.resizeZoneGap;
  // ---- states ----
  width: WritableSignal<number> = signal(0);
  height: WritableSignal<number> = signal(0);
  // ---- I/O ----

  sizeUpdate: OutputEmitterRef<IResizeData> = output();
  latestSize: InputSignal<IResizeData> = input({ width: 300, height: 300 });

  mouseDown$ = fromEvent(this.resizableElement, 'mousedown');
  mouseMove$ = fromEvent(document, 'mousemove');
  resizeCancelation$ = race(
    fromEvent(this.resizableElement, 'mouseup'),
    fromEvent(document, 'mouseup'),
    fromEvent(document, 'contextmenu')
  );

  resizeStart$ = this.mouseDown$.pipe(
    filter(
      (mouseMove: any) =>
        this.isValidForResize(mouseMove.offsetX, mouseMove.offsetY) != false
    ),
    switchMap((mouseMove: any) => {
      const firstWidth = this.resizableElement.clientWidth;
      const firstHeight = this.resizableElement.clientHeight;
      const firstMouseX = mouseMove.clientX;
      const firstMosueY = mouseMove.clientY;
      console.log(mouseMove.offsetY);

      return this.mouseMove$.pipe(
        // debounceTime(10),
        map((move: any) => ({
          width: Number(firstWidth + (move.clientX - firstMouseX)),
          height: Number(firstHeight + (move.clientY - firstMosueY)),
        })),
        filter((size: IResizeData) => size.width > 100 && size.height > 100),
        distinctUntilChanged(
          (a: IResizeData, b: IResizeData) =>
            a.width === b.width && a.height === b.height
        ),
        takeUntil(this.resizeCancelation$)
      );
    })
  );

  isValidForResize(offsetX: number, offsetY: number): boolean | string {
    switch (true) {
      case offsetX <= this.resizeZoneGap:
        console.log('1');

        return EResizeDirections.horizontal;
      case offsetY <= this.resizeZoneGap:
        console.log('2');

        return EResizeDirections.vertical;
      case offsetX <= this.resizeZoneGap && offsetY >= this.allowdYResizeGap:
        console.log('3');

        return EResizeDirections.Wdiagonal;
      case offsetX >= this.allowdXResizeGap && offsetY <= this.resizeZoneGap:
        console.log('4');

        return EResizeDirections.Ediagonal;
        // case offsetX >= this.allowdXResizeGap && offsetY >= this.allowdYResizeGap:
        //   console.log('5');

        return EResizeDirections.Wdiagonal;
      case offsetX <= this.resizeZoneGap && offsetY <= this.resizeZoneGap:
        console.log('6');

        return EResizeDirections.Ediagonal;
      default:
        return false;
    }
  }

  emitLatestSize = this.resizeStart$
    .pipe(
      takeUntilDestroyed(this.destoryRef$),
      throttleTime(50),
      tap((elementPosition) => {
        this.sizeUpdate.emit(elementPosition);
      })
    )
    .subscribe();
}
