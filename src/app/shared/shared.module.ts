import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';

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
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzListModule,
    NzInputNumberModule,
    NzInputModule,
  ],
  exports: [
    NzButtonModule,
    NzIconModule,
    NzAvatarModule,
    NzSwitchModule,
    NzSelectModule,
    NzBadgeModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzListModule,
    NzInputNumberModule,
    NzInputModule,
  ],
})
export class SharedModule {}
