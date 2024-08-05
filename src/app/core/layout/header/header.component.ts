import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { IUser } from '../../../pages/brainstorming/jamboard/models/element.model';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';
import { AuthService } from '../../authentication/auth.service';
import { SharedModule } from '../../../shared/shared.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoginModalComponent } from '../../authentication/components/login-modal/login-modal.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SharedModule,
    DropDownComponent,
    NzModalModule,
    LoginModalComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {}
  authService = inject(AuthService);
  userProfile: InputSignal<IUser> = input.required();
  usersInSession: InputSignal<IUser[]> = input.required();

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
      onClick: () => {
        this.authService.logout();
      },
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
    this.authService.login(formData);
    this.handleCancel();
  }
}
