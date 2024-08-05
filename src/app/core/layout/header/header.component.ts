import { Component, signal } from '@angular/core';
import { IUser } from '../../../pages/brainstorming/jamboard/models/element.model';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzAvatarModule,
    NzSwitchModule,
    NzSelectModule,
    NzBadgeModule,
    DropDownComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userProfileMenuItems = {
    title: 'Hooman',
    items: [
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
          console.log('profile clicked');
        },
      },
    ],
  };

  users = signal<IUser[]>([
    {
      id: '1',
      name: 'user 1',
      avatarUrl: 'https://avatars.githubusercontent.com/u/10214025?v=4',
      curser: {
        id: '1',
        color: 'red',
        position: {
          x: 100,
          y: 100,
        },
      },
      status: 'editting',
      activeModule: 'jamboard',
    },
    {
      id: '2',
      name: 'user 2',
      avatarUrl: 'https://avatars.githubusercontent.com/u/10214025?v=4',
      curser: {
        id: '2',
        color: 'blue',
        position: {
          x: 200,
          y: 200,
        },
      },
      status: 'offline',
      activeModule: 'planning',
    },
    {
      id: '3',
      name: 'user 3',
      avatarUrl: 'https://avatars.githubusercontent.com/u/10214025?v=4',
      curser: {
        id: '3',
        color: 'green',
        position: {
          x: 300,
          y: 300,
        },
      },
      status: 'online',
      activeModule: 'design',
    },
  ]);
}
