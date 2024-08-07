import { Component } from '@angular/core';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'app-segmented',
  standalone: true,
  imports: [NzSegmentedModule],
  templateUrl: './segmented.component.html',
  styleUrl: './segmented.component.scss',
})
export class SegmentedComponent {}
