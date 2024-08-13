import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { TagComponent } from '../../../../../shared/components/tag/tag.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { IJamElement } from '../../models/element.model';
import { v4 as uuidv4 } from 'uuid';

export type TJmasidebarState = 'settings' | 'elements';

@Component({
  selector: 'app-jamsidebar',
  standalone: true,
  imports: [TagComponent, SharedModule],
  templateUrl: './jamsidebar.component.html',
  styleUrl: './jamsidebar.component.scss',
  animations: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JamsidebarComponent {
  activeSettings = input.required();

  sideBar: InputSignal<string> = input('elements');

  settings = [];

  // tags = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'gray'];
  elements: string[] = [
    'note',
    'button',
    'tag',
    'dropdown',
    'radio',
    'checkbox',
    'input',
    'select',
  ];

  generateUniqueId() {
    return uuidv4();
  }
}
