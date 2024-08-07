import { Component } from '@angular/core';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [NzColorPickerComponent],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent {}
