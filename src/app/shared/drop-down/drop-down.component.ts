import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SharedModule } from '../shared.module';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUser } from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [NzDropDownModule, SharedModule],
  providers: [provideIcons({ heroUser })],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownComponent {
  menuItems: InputSignal<any> = input.required();
  user = heroUser;

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
