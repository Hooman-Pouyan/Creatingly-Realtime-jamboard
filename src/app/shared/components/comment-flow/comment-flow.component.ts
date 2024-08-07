import { Component } from '@angular/core';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { formatDistance } from 'date-fns';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-comment-flow',
  standalone: true,
  imports: [NzCommentModule, SharedModule],
  templateUrl: './comment-flow.component.html',
  styleUrl: './comment-flow.component.scss',
})
export class CommentFlowComponent {
  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  };
  inputValue = '';

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date()),
        },
      ].map((e) => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime),
      }));
    }, 800);
  }
}
