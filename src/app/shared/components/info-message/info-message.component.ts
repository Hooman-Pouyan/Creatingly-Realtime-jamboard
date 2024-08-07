import { Component, effect, inject } from '@angular/core';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { concatMap } from 'rxjs/operators';
import { CommentService } from '../../../pages/brainstorming/jamboard/services/comment.service';

@Component({
  selector: 'app-info-message',
  standalone: true,
  imports: [NzMessageModule],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.scss',
})
export class InfoMessageComponent {
  constructor(private message: NzMessageService) {
  }

  startShowMessages(): void {
    this.message
      .loading('Action in progress', { nzDuration: 2500 })
      .onClose!.pipe(
        concatMap(
          () =>
            this.message.success('Loading finished', { nzDuration: 2500 })
              .onClose!
        ),
        concatMap(
          () =>
            this.message.info('Loading finished is finished', {
              nzDuration: 2500,
            }).onClose!
        )
      )
      .subscribe(() => {
        console.log('All completed!');
      });
  }

  a = effect(() => {});
}
