import { inject, Injectable, OnInit } from '@angular/core';
// import { ITask } from '../models/task.models';
import { delay, filter, from, map, Observable, of, tap, toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../../../app.config';
import { SocketService } from '../../../../core/services/socket.service';
@Injectable({
  providedIn: 'root',
})
export class JamBoardService implements OnInit {
  ngOnInit(): void {}
  socketService = inject(SocketService);
  hotelcache = new Map();

  http = inject(HttpClient);
  baseUrl = inject(API_BASE_URL);

  // tasks: ITask[] = [
  //   {
  //     id: '1',
  //     title: 'task 1',
  //     description: 'sddsadsadasdafasd',
  //     reporter: 'hooman',
  //     assignee: 'ali',
  //     storyPoint: 2,
  //     ramainingTime: 34,
  //     status: 'todo',
  //     isClosed: false,
  //     isInActiveSprint: false,
  //     priority: 'very-high',
  //     team: 'frontend',
  //     board: 'website',
  //   },
  //   {
  //     id: '2',
  //     title: 'task 2',
  //     description: 'sd121212121d',
  //     reporter: 'hooman',
  //     assignee: 'ali',
  //     storyPoint: 2,
  //     ramainingTime: 4,
  //     status: 'todo',
  //     isClosed: false,
  //     isInActiveSprint: false,
  //     priority: 'very-high',
  //     team: 'frontend',
  //     board: 'thirdparty',
  //   },
  //   {
  //     id: '3',
  //     title: 'task 3',
  //     description: 'sddsadszxcxzcxzcxzd',
  //     reporter: 'hooman',
  //     assignee: 'ali',
  //     storyPoint: 2,
  //     ramainingTime: 10,
  //     status: 'todo',
  //     isClosed: false,
  //     isInActiveSprint: false,
  //     priority: 'very-high',
  //     team: 'frontend',
  //     board: 'mobile-app',
  //   },
  //   {
  //     id: '4',
  //     title: 'task 4',
  //     description: 'QEQEQEd',
  //     reporter: 'hooman',
  //     assignee: 'ali',
  //     storyPoint: 2,
  //     ramainingTime: 6,
  //     status: 'todo',
  //     isClosed: false,
  //     isInActiveSprint: false,
  //     priority: 'very-high',
  //     team: 'frontend',
  //     board: 'website',
  //   },
  //   {
  //     id: '5',
  //     title: 'task 1',
  //     description: 'sdasdasds',
  //     reporter: 'mohammad',
  //     assignee: 'reza shaban',
  //     storyPoint: 5,
  //     ramainingTime: 12,
  //     status: 'inprogress',
  //     isClosed: false,
  //     isInActiveSprint: true,
  //     priority: 'high',
  //     team: 'backend',
  //     board: 'apiout',
  //   },
  // ];

  // getAll(board: string, query?: string): Observable<ITask[]> {
  //   return this.hotelcache.get(board)
  //     ? of(this.hotelcache.get(board))
  //     : from(this.tasks).pipe(
  //         filter((tasks) => tasks.board == board),
  //         toArray(),
  //         tap((hotels) => {
  //           this.hotelcache.set(board, hotels);
  //           console.log('stored in cache');
  //         }),
  //         delay(2000)
  //       );
  // }

  getLastStateAsInitial(): Observable<any> {
    return this.http.get<any>(this.baseUrl, { headers: {}, params: {} });
  }

  sendSocketMessage(eventName: string, data: any) {
    // this.socketService.sendMessage(eventName, data);
  }
}
