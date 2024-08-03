import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { find, findIndex, map, pipe, switchMap, tap } from 'rxjs';
import { TaskService } from '../services/task.service';
import { ITask } from '../models/task.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Data } from '@angular/router';
import { EStatus } from '../models/task.models';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { EOrder, TQuery } from '../../../../core/models/transformers';

type TasksState = {
  Tasks: ITask[];
  isLoading: boolean;
  status: 'pending' | 'loading' | 'success' | 'failure';
  filter: { query: TQuery; order: EOrder };
};

const initialState: TasksState = {
  Tasks: [],
  isLoading: false,
  status: 'pending',
  filter: { query: {}, order: EOrder.asc },
};

export const TasksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ Tasks, isLoading, filter: { query, order } }) => ({
    orderedTasks: computed(() => {
      return Tasks().sort((a, b) => {
        if (order() === EOrder.asc) {
          return a.title.localeCompare(b.title);
        }
        return b.title.localeCompare(a.title);
      });
    }),
    activeTasks: computed(() =>
      Tasks().filter((task) => task.isInActiveSprint && !task.isClosed)
    ),
    dueTasks: computed(() =>
      Tasks().filter((task) => +task.ramainingTime < 24)
    ),
    doneTasks: computed(() =>
      Tasks().filter((task) => task.status == EStatus.done)
    ),
    blockedTasks: computed(() =>
      Tasks().filter((task) => task.status == EStatus.blocked)
    ),
    inprogressTasks: computed(() =>
      Tasks().filter((task) => task.status == EStatus.inprogress)
    ),
    todoTasks: computed(() =>
      Tasks().filter((task) => task.status == EStatus.todo)
    ),
  })),
  withHooks({
    onInit(store, taskService = inject(TaskService)) {
      taskService
        .getAll('website')
        .pipe(
          tap((_tasks) =>
            patchState(store, { Tasks: _tasks, isLoading: false, status: 'success' })
          ),
          takeUntilDestroyed()
        )
        .subscribe();
    },
    onDestroy(store) {
      console.log('task store destroy', store);
    },
  }),
  withMethods((store, taskService = inject(TaskService)) => ({
    updateQuery(query: TQuery): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    updateOrder(order: EOrder): void {
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },
    updateTaskStatus(taskId: string, _status: EStatus): void {
      patchState(store, (state) => ({
        isLoading: true,
        tasks: [],
      }));
    },
    updateTaskStatus2: rxMethod<{ taskId: string; newStatus: string }>(
      pipe()
      // switchMap((payload) => taskService.updateTask(payload)),
    ),
    async loadAll(board: string, query: string): Promise<void> {
      await taskService.getAll(board, query).pipe(
        tap((tasks) => {
          patchState(store, {
            Tasks: tasks,
            isLoading: false,
            status: 'success',
          });
        })
      );
    },
  }))
);
