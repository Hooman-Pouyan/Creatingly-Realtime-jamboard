import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagComponent } from '../../../../../shared/components/tag/tag.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { IJamElement } from '../../models/element.model';

@Component({
  selector: 'app-jamsidebar',
  standalone: true,
  imports: [TagComponent, SharedModule],
  templateUrl: './jamsidebar.component.html',
  styleUrl: './jamsidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JamsidebarComponent {
  activeSettings = input.required();

  // tags = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'gray'];
  tags: IJamElement[] = [
    {
      id: '1',
      appearence: {
        color: 'red',
      },
      type: 'tag',
      data: {
        content: {
          text: 'hi',
        },
      },
      info: {},
      size: {
        width: 100,
        height: 50,
      },
      position: {
        x: 400,
        y: 200,
      },
      status: '',
      options: {},
    },
  ];
}
