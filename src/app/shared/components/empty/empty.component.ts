import { Component } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [NzEmptyModule],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss',
})
export class EmptyComponent {}
