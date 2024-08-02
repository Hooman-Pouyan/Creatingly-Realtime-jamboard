import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ConnectorsService } from '../../pages/brainstorming/jamboard/services/connectors.service';

@Directive({
  selector: '[appConnectors]',
  standalone: true,
})
export class ConnectorsDirective {
  @Input() noteId!: string;
  private connectors: any[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private connectorService: ConnectorsService
  ) {}

  ngOnInit() {
    this.createAnchors();
  }

  private createAnchors() {
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

    positions.forEach((pos) => {
      const dot = this.renderer.createElement('div');
      this.renderer.addClass(dot, 'connector-anchor');
      this.renderer.addClass(dot, pos);
      this.renderer.appendChild(this.el.nativeElement, dot);

      this.addDragListeners(dot);
    });
  }

  private addDragListeners(dot: any) {
    const mousedown$ = fromEvent(dot, 'mousedown');
    const mousemove$ = fromEvent(document, 'mousemove');
    const mouseup$ = fromEvent(document, 'mouseup');

    mousedown$
      .pipe(
        switchMap((startEvent: any) => {
          startEvent.preventDefault();
          return mousemove$.pipe(takeUntil(mouseup$));
        })
      )
      .subscribe((moveEvent: any) => {
        const line = this.createLine(dot, moveEvent.clientX, moveEvent.clientY);
        this.renderer.appendChild(this.el.nativeElement.parentElement, line); // Append to the parent container
        this.connectors.push(line);

        mouseup$.subscribe((endEvent: any) => {
          this.finishDrawing(line, endEvent.clientX, endEvent.clientY);
        });
      });
  }

  private createLine(dot: any, x: any, y: any) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const startX = rect.left + dot.offsetLeft + dot.offsetWidth / 2;
    const startY = rect.top + dot.offsetTop + dot.offsetHeight / 2;
    const svgNS = 'http://www.w3.org/2000/svg';
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', `${startX}`);
    line.setAttribute('y1', `${startY}`);
    line.setAttribute('x2', `${x}`);
    line.setAttribute('y2', `${y}`);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('class', 'connector-line');
    return line;
  }

  private finishDrawing(line: any, x: any, y: any) {
    line.setAttribute('x2', `${x}`);
    line.setAttribute('y2', `${y}`);
    const target = document.elementFromPoint(x, y);
    if (target && target.classList.contains('sticky-note')) {
      this.connectorService.connections.update((value) => [
        ...value,
        {
          from: this.noteId,
          to: target.id,
          line,
        },
      ]);
    } else {
      this.renderer.removeChild(this.el.nativeElement.parentElement, line); // Remove from the parent container
    }
  }
}
