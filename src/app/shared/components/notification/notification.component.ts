import { Component } from '@angular/core';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NzNotificationModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {}
