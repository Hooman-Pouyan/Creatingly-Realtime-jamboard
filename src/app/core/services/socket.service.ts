import { inject, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SockerService implements OnInit {
  private socket = inject(WebSocket);

  ngOnInit(): void {}
}
