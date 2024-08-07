import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-jamsidebar',
  standalone: true,
  imports: [],
  templateUrl: './jamsidebar.component.html',
  styleUrl: './jamsidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JamsidebarComponent {
  activeSettings = input.required();
}
