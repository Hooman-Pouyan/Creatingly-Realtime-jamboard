import { Injectable } from '@angular/core';
import {
  EBoard,
  EPriorities,
  EStatus,
  ETeams,
  ITask,
} from '../models/task.models';
import {
  delay,
  exhaustMap,
  filter,
  from,
  interval,
  map,
  Observable,
  of,
  switchMap,
  tap,
  toArray,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  hotelcache = new Map();

  tasks: ITask[] = [
    {
      id: '1',
      title: 'task 1',
      description: 'sddsadsadasdafasd',
      reporter: 'hooman',
      assignee: 'ali',
      storyPoint: 2,
      ramainingTime: 34,
      status: EStatus.todo,
      isClosed: false,
      isInActiveSprint: false,
      priority: EPriorities.high,
      team: ETeams.Marketing,
      board: EBoard.dashboard,
    },
    {
      id: '2',
      title: 'task 2',
      description: 'sd121212121d',
      reporter: 'hooman',
      assignee: 'ali',
      storyPoint: 2,
      ramainingTime: 4,
      status: EStatus.todo,
      isClosed: false,
      isInActiveSprint: false,
      priority: EPriorities.high,
      team: ETeams.Marketing,
      board: EBoard.dashboard,
    },
    {
      id: '3',
      title: 'task 3',
      description: 'sddsadszxcxzcxzcxzd',
      reporter: 'hooman',
      assignee: 'ali',
      storyPoint: 2,
      ramainingTime: 10,
      status: EStatus.todo,
      isClosed: false,
      isInActiveSprint: false,
      priority: EPriorities.high,
      team: ETeams.Marketing,
      board: EBoard.website,
    },
    {
      id: '4',
      title: 'task 4',
      description: 'QEQEQEd',
      reporter: 'hooman',
      assignee: 'ali',
      storyPoint: 2,
      ramainingTime: 6,
      status: EStatus.done,
      isClosed: false,
      isInActiveSprint: false,
      priority: EPriorities.high,
      team: ETeams.Marketing,
      board: EBoard.mobile,
    },
    {
      id: '5',
      title: 'task 1',
      description: 'sdasdasds',
      reporter: 'mohammad',
      assignee: 'reza shaban',
      storyPoint: 5,
      ramainingTime: 12,
      status: EStatus.blocked,
      isClosed: false,
      isInActiveSprint: true,
      priority: EPriorities.high,
      team: ETeams.Marketing,
      board: EBoard.dashboard,
    },
  ];

  getAll(
    board: string = EBoard.dashboard,
    query?: string
  ): Observable<ITask[]> {
    // return this.hotelcache.get(board)
    //   ? of(this.hotelcache.get(board))
    //   : from(this.tasks).pipe(
    //       filter((tasks) => tasks.board == board),
    //       toArray(),
    //       tap((hotels) => {
    //         this.hotelcache.set(board, hotels);
    //         console.log('stored in cache');
    //       }),
    //       delay(2000)
    //     );

    return of(this.tasks)
  }
}
