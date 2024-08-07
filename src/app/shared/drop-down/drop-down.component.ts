import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [NzDropDownModule, SharedModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownComponent {
  menuItems: InputSignal<any> = input.required();

  listOfPosition: NzPlacementType[] = [
    'bottomLeft',
    'bottomCenter',
    'bottomRight',
    'topLeft',
    'topCenter',
    'topRight',
  ];

  viewProfile() {}
}
