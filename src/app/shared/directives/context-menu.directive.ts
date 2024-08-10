import {
  DestroyRef,
  Directive,
  effect,
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
import { ContextService } from '../../core/services/context.service';
import { CommentFlowComponent } from '../components/comment-flow/comment-flow.component';
import { CommentBoxComponent } from '../components/comment-box/comment-box.component';

@Directive({
  selector: '[canContextMenu]',
  standalone: true,
  providers: [NzContextMenuService],
})
export class ContextMenuDirective implements OnInit {
  constructor(
    private nzContextMenuService: NzContextMenuService,
    private contextService: ContextService,
    private vcr: ViewContainerRef
  ) {}

  createComment() {
    this.vcr.clear();
    this.vcr.createComponent(CommentBoxComponent);
  }

  ngOnInit(): void {
    this.mouseDown$.subscribe((e) => {
      this.createContextMenu(e, this.contextService.dropDownTemplateRef()!);
    });
  }

  ContextMenuSignal = effect(() => {
    if (this.contextService.contextAction()?.id == this.contextableElement.id) {
      switch (this.contextService.contextAction()?.type) {
        case 'comment':
          this.createComment();
          break;
        case 'addReply':
          break;
        case 'addLike':
          break;
        case 'delete':
          this.vcr.clear();
          this.contextableElement.remove();
          break;
      }
    }
  });

  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  destoryRef$ = inject(DestroyRef);

  contextableElement: HTMLElement = this.elementRef.nativeElement;
  elementId = this.contextableElement.id;

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
