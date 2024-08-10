import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  InputSignal,
  OnChanges,
  OnInit,
  output,
  Signal,
  signal,
  SimpleChanges,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUser } from '@ng-icons/heroicons/outline';
import {
  bootstrapArrowsFullscreen,
  bootstrapFullscreenExit,
  bootstrapLayoutSidebarInset,
} from '@ng-icons/bootstrap-icons';
import { SharedModule } from '../../../../shared/shared.module';
import { DropDownComponent } from '../../../../shared/drop-down/drop-down.component';
import { IUser } from '../../../../pages/brainstorming/jamboard/models/element.model';
import { LoginModalComponent } from '../../../authentication/components/login-modal/login-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SharedModule,
    DropDownComponent,
    NzModalModule,
    LoginModalComponent,
    NgIconComponent,
    CommonModule,
  ],
  providers: [
    provideIcons({
      heroUser,
      bootstrapArrowsFullscreen,
      bootstrapFullscreenExit,
      bootstrapLayoutSidebarInset,
    }),
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }
  user = heroUser;
  bootstrapArrowsFullscreen = bootstrapArrowsFullscreen;
  bootstrapFullscreenExit = bootstrapFullscreenExit;
  bootstrapLayoutSidebarInset = bootstrapLayoutSidebarInset;
  ngOnInit(): void {}
  usersInSession: InputSignal<IUser[] | undefined> = input.required();
  userProfile: InputSignal<IUser> = input.required();
  isFullScreenMode: InputSignal<boolean> = input.required();
  logoutEmitter = output();
  loginEmitter = output();
  FullScreenUpdate = output();
  menuUpdate = output();

  // b = effect(() => {
  //   console.log('aaaaa', this.a());
  // });

  userProfileMenuItems = [
    {
      label: 'Profile',
      icon: 'user',
      route: '',
      onClick: () => {
        console.log('profile clicked');
      },
    },
    {
      label: '',
      icon: 'user',
      route: '',
      onClick: () => {
        console.log('profile clicked');
      },
    },
    {
      label: 'Logout',
      icon: 'logout',
      route: './logout',
      onClick: () => this.logoutEmitter.emit(),
    },
  ];

  // usersInSession: Signal<IUser[] | undefined> = toSignal(
  //   this.authService.getUsers('status=online')
  // );

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  toggleFullScreen() {
    this.FullScreenUpdate.emit();
  }

  toggleMenu() {
    this.menuUpdate.emit();
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  sendLoginData(formData: any) {
    this.loginEmitter.emit(formData);
    this.handleCancel();
  }
}
