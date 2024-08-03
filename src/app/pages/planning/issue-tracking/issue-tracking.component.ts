/* eslint-disable @nx/enforce-module-boundaries */
import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  Inject,
  InjectionToken,
  Injector,
  input,
  OnInit,
  Signal,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  bufferCount,
  concat,
  concatAll,
  concatMap,
  defaultIfEmpty,
  delay,
  exhaustMap,
  from,
  fromEvent,
  groupBy,
  iif,
  interval,
  last,
  map,
  mergeMap,
  Observable,
  of,
  partition,
  pipe,
  pluck,
  reduce,
  scan,
  shareReplay,
  skipWhile,
  startWith,
  switchMap,
  take,
  takeLast,
  takeWhile,
  tap,
  toArray,
} from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { TasksStore } from './states/task.state';
import { EStatus, ITask } from './models/task.models';
@Component({
  selector: 'app-issue-tracking',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './issue-tracking.component.html',
  styleUrl: './issue-tracking.component.scss',
  providers: [TasksStore],
})
export class IssueTrackingComponent implements OnInit {
  constructor() {
    this.store.loadAll('website', '');
    effect(() => {
      console.log(this.tasks());
    });
  }
  ngOnInit(): void {
    console.log(this.store.todoTasks());
  }

  board?: Signal<string> = input('website');
  protected store = inject(TasksStore);
  tasks = this.store.Tasks;
  doneTasks: WritableSignal<ITask[]> = signal(this.store.doneTasks());
  todoTasks: WritableSignal<ITask[]> = signal(this.store.todoTasks());
  inprogressTasks: WritableSignal<ITask[]> = signal(
    this.store.inprogressTasks()
  );
  blockedTasks: WritableSignal<ITask[]> = signal(this.store.blockedTasks());

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const previousStatus: EStatus = event.previousContainer.id as EStatus;
      const newStatus: EStatus = event.container.id as EStatus;

      const status: Record<EStatus, ITask[]> = {
        [EStatus.todo]: this.todoTasks(),
        [EStatus.done]: this.doneTasks(),
        [EStatus.blocked]: this.blockedTasks(),
        [EStatus.inprogress]: this.inprogressTasks(),
      };
      console.log(this.store.isLoading());

      this.store.updateTaskStatus(
        status[previousStatus][event.previousIndex].id,
        newStatus
      );

      console.log(this.store.isLoading());

      console.log(this.store.Tasks());

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
