import { Component } from '@angular/core';
import { NzMessageModule } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-info-message',
  standalone: true,
  imports: [NzMessageModule],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.scss',
})
export class InfoMessageComponent {}
