import { Component, input } from '@angular/core';

@Component({
  selector: 'app-jamsidebar',
  standalone: true,
  imports: [],
  templateUrl: './jamsidebar.component.html',
  styleUrl: './jamsidebar.component.scss',
})
export class JamsidebarComponent {
  activeSettings = input.required();
}
