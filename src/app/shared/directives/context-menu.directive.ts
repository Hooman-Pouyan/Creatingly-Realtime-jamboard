import {
  ComponentRef,
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent, filter } from 'rxjs';
import { ContextMenuComponent } from '../components/context-menu/context-menu.component';
import {
  NzDropdownMenuComponent,
  NzContextMenuService,
} from 'ng-zorro-antd/dropdown';
import { ContextServiceService } from '../../core/services/context-service.service';

@Directive({
  selector: '[canContextMenu]',
  standalone: true,
  providers: [NzContextMenuService],
})
export class ContextMenuDirective implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private nzContextMenuService: NzContextMenuService,
    private contextService: ContextServiceService
  ) {}
  ngOnInit(): void {
    this.mouseDown$.subscribe((e) => {
      // this.contextMenu(e, this.contextMenu);
      this.createContextMenu(e, this.contextService.dropDownTemplateRef()!);
    });
  }

  a = NzDropdownMenuComponent;

  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  destoryRef$ = inject(DestroyRef);

  _contextMenu = ContextMenuComponent;

  contextableElement = this.elementRef.nativeElement;

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  mouseDown$ = fromEvent(this.contextableElement, 'mousedown').pipe(
    filter((event: any) => event.button == 2)
  );

  showContextMenu() {
    const a = document.createElement('div');
    a.className = 'context-area absolute top-0 left-0';
    a.textContent = 'contextahhohdfohdiosdhfisdhfodshfodshfodshf-area';
    this.renderer.appendChild(this.contextableElement, a);
    // this.renderer.appendChild(this.contextableElement, this.contextMenu);
  }

  createContextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }
}
