import { Component } from '@angular/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [NzDropDownModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
})
export class ContextMenuComponent {
  nzContextMenuService: any;
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }
}
