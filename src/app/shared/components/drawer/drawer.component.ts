import { Component } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [NzDrawerModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {}
