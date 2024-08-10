import { Component, input, InputSignal, OnInit } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DragdropDirective } from '../../directives/dragdrop.directive';
import { InsertComponentDirective } from '../../directives/insert-component.directive';
import { BaseElementComponent } from '../../../pages/brainstorming/jamboard/components/base-element/base-element.component';
import { UtilityDirectaive } from '../../directives/utility.directive';
@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    NzTagModule,
    DragdropDirective,
    InsertComponentDirective,
    UtilityDirectaive,
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent extends BaseElementComponent implements OnInit {
  updatePosition(position: any) {
    console.log(position);
  }
}
