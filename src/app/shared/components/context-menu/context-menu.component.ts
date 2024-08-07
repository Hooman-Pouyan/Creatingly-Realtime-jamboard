import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  Signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
  NzDropDownModule,
} from 'ng-zorro-antd/dropdown';
import { DropDownComponent } from '../../drop-down/drop-down.component';
import { ContextServiceService } from '../../../core/services/context-service.service';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [NzDropDownModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent implements OnInit {
  contextService = inject(ContextServiceService);

  dropDownMenu: Signal<NzDropdownMenuComponent | undefined> =
    viewChild('contextmenu');

  constructor(private nzContextMenuService: NzContextMenuService) {}
  ngOnInit(): void {
    this.contextService.dropDownTemplateRef.set(this.dropDownMenu());
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }
}
