import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
@NgModule({
  providers: [],
  declarations: [],
  imports: [
    NzButtonModule,
    NzIconModule,
    NzAvatarModule,
    NzSwitchModule,
    NzSelectModule,
    NzBadgeModule,
  ],
  exports: [
    NzButtonModule,
    NzIconModule,
    NzAvatarModule,
    NzSwitchModule,
    NzSelectModule,
    NzBadgeModule,
  ],
})
export class SharedModule {}
