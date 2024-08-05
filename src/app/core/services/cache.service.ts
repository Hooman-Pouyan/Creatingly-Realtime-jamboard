import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  // private cache: Map<string, Observable<HttpEvent<unknown>>> = new Map()
  cache: Map<string, Observable<any>> = new Map();

  put(url: string, response: Observable<any>) {
    this.cache.set(url, response);
  }

  get(url: string) {
    return this.cache.get(url);
  }

  delete(url: string) {
    return this.cache.delete(url);
  }

  clearAll() {
    this.cache.clear;
  }
}
