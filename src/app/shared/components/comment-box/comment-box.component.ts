import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { DragdropDirective } from '../../directives/dragdrop.directive';
import { SharedModule } from '../../shared.module';
import { AuthService } from '../../../core/authentication/auth.service';
import { IJamComment } from '../../../pages/brainstorming/jamboard/models/jamboard.model';
import { CommentService } from '../../../pages/brainstorming/jamboard/services/comment.service';
import { JamboardStore } from '../../../pages/brainstorming/jamboard/states/jamboard.state';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [NzCommentModule, SharedModule, DragdropDirective],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss',
})
export class CommentBoxComponent {
  authService = inject(AuthService);
  jamboardStore = inject(JamboardStore);
  commentService = inject(CommentService);
  comments: InputSignal<any[]> = input.required();
  constructor() {
    effect(() => {
      this.data.set(this.jamboardStore.state.comments());
    });
  }

  data: WritableSignal<any[]> = signal<IJamComment[]>([]);
  submitting = false;
  userProfile = this.authService.usersStore$.userProfile;
  comments$ = this.commentService.onCommentMessages;
  user = {
    author: this.userProfile()?.name,
    avatar: this.userProfile()?.avatarUrl,
  };

  inputValue = '';
  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    this.submitting = false;
    this.data.set(
      [
        ...this.data(),
        {
          ...this.user,
          id: '1',
          content,
          datetime: new Date(),
        },
      ].map((e) => ({
        ...e,
      }))
    );
    console.log(this.data);

    this.commentService.addComment('1', '1', this.data);
  }
}
