import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
  NzDropDownModule,
} from 'ng-zorro-antd/dropdown';
import { ContextService } from '../../../core/services/context.service';
import {
  contextMenuItems,
  TContextMenuItem,
} from '../../../core/utilities/context-menu-items';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [NzDropDownModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
})
export class ContextMenuComponent implements OnInit {
  contextService = inject(ContextService);
  authService = inject(AuthService);
  defaultMenu: WritableSignal<TContextMenuItem[] | undefined> = signal([]);
  onlyLoggedInUsersOptions = ['delete', 'comment', 'share'];

  dropDownMenu: Signal<NzDropdownMenuComponent | undefined> =
    viewChild('contextmenu');

  constructor(private nzContextMenuService: NzContextMenuService) {
    // this.defaultMenu[0].action.bind(this.contextService.addComment);
  }

  ngOnInit(): void {
    this.defaultMenu.set(this.updateContextMenu());
    this.contextService.dropDownTemplateRef.set(this.dropDownMenu());
  }

  dispatchContextAction(action: string, id: string, data?: any) {
    this.contextService.createContextAction(action, id);
  }

  listenToAuthState = effect(() => {
    if (this.authService.usersStore$()) {
      this.defaultMenu.set(this.updateContextMenu());
    }
  });

  updateContextMenu(): TContextMenuItem[] {
    return contextMenuItems.map((item) => {
      return {
        ...item,
        disabled: !this.authService.usersStore$.isAuthenticated(),
      };
    });
  }
}
