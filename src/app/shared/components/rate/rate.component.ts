import { Component } from '@angular/core';
import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [NzRateModule],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.scss',
})
export class RateComponent {}
