import { Component } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [NzTagModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {}
