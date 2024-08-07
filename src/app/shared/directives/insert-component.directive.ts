import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[canInsertComponent]',
  standalone: true,
})
export class InsertComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
