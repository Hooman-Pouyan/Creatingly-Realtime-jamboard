import {
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
import { IUser } from '../../../pages/brainstorming/jamboard/models/element.model';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';
import { AuthService, IUsersState } from '../../authentication/auth.service';
import { SharedModule } from '../../../shared/shared.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoginModalComponent } from '../../authentication/components/login-modal/login-modal.component';
import { toSignal } from '@angular/core/rxjs-interop';

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
export class HeaderComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }
  ngOnInit(): void {}
  usersInSession: InputSignal<IUser[] | undefined> = input.required();
  userProfile: InputSignal<IUser> = input.required();
  logoutEmitter = output();
  loginEmitter = output();

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
