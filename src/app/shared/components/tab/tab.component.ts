import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [NzTabsModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class TabComponent {}
