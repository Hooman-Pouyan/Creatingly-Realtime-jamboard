import { Component } from '@angular/core';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [NzSwitchModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {}
