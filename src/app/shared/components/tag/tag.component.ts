import { Component, input, InputSignal } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DragdropDirective } from '../../directives/dragdrop.directive';
import { InsertComponentDirective } from '../../directives/insert-component.directive';
@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [NzTagModule, DragdropDirective, InsertComponentDirective],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  color: InputSignal<string> = input.required();

  updatePosition(position: any) {
    console.log(position);
  }
}
