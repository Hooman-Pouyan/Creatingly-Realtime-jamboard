import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  signal,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { SharedModule } from '../../shared.module';
import { AuthService } from '../../../core/authentication/auth.service';
import { CommentService } from '../../../pages/brainstorming/jamboard/services/comment.service';
import { IJamComment } from '../../../pages/brainstorming/jamboard/models/jamboard.model';
import { DragdropDirective } from '../../directives/dragdrop.directive';
import { toSignal } from '@angular/core/rxjs-interop';
import { JamboardStore } from '../../../pages/brainstorming/jamboard/states/jamboard.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-flow',
  standalone: true,
  imports: [CommonModule, NzCommentModule, SharedModule, DragdropDirective],
  templateUrl: './comment-flow.component.html',
  styleUrl: './comment-flow.component.scss',
})
export class CommentFlowComponent {
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
}
