import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConnectorsService {
  connections: WritableSignal<
    { from: string; to: string; line: SVGLineElement }[]
  > = signal([]);

  constructor() {}
}
