import { Component } from '@angular/core';
import { BaseElementComponent } from '../../../pages/brainstorming/jamboard/components/base-element/base-element.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DragdropDirective } from '../../directives/dragdrop.directive';
import { ResizeDirective } from '../../directives/resize.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NzButtonModule, DragdropDirective, ResizeDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent extends BaseElementComponent {}
