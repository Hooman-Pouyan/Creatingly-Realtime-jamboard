import {
  ChangeDetectionStrategy,
  Component,
  effect,
  viewChild,
} from '@angular/core';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
  NzDropDownModule,
} from 'ng-zorro-antd/dropdown';
import { DropDownComponent } from '../../drop-down/drop-down.component';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [NzDropDownModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent {
  dropDownMenu = viewChild('contextmenu');

  a = effect(() => {
    console.log('a', this.dropDownMenu());
  });

  constructor(private nzContextMenuService: NzContextMenuService) {}

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  static contextMenu() {
    return DropDownComponent;
  }
}
