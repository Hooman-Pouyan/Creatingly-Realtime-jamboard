import { Component } from '@angular/core';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [NzPopconfirmModule],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.scss',
})
export class ConfirmPopupComponent {}
