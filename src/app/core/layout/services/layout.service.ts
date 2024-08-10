import {
  computed,
  effect,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor() {}

  lahyoutSidebar: Signal<any> = signal(null);
  lahyoutHeader: Signal<any> = signal(null);
  fullScreenMode: WritableSignal<boolean> = signal(false);
  isMenuCollapsed: WritableSignal<boolean> = signal(false);
  offsetX = computed(() =>
    this.fullScreenMode() ? 48 : this.isMenuCollapsed() ? 125 : 300
  );
  offsetY = computed(() => (this.fullScreenMode() ? 48 : 112));
}
