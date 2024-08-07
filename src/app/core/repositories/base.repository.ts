import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import {
  inject,
  Inject,
  Injectable,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { CacheService } from '../services/cache.service';
import { API_BASE_URL } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class BaseRepository {
  protected http: HttpClient;
  protected baseUrl: string;
  protected cacheService: CacheService;

  protected options_: any = {
    observe: 'response',
    responseType: 'json',
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    }),
    withCredentials: true,
  };

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Inject(CacheService) cacheService: CacheService,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl ?? '';
    this.cacheService = cacheService;
  }

  public getWithoutCache<T>(
    url: string,
    options = this.options_
  ): Observable<T> {
    return this.http.get<T>(url).pipe();
  }

  public get<T>(
    url: string,
    mandatoryFetch = false,
    options = this.options_
  ): Observable<T> {
    if (mandatoryFetch) {
      this.cacheService.delete(url);
      return this.sendGetRequest(url, options);
    }
    const cachedResponse = this.cacheService.get(url);
    if (cachedResponse) {
      // console.log('cache hit)
      return cachedResponse as Observable<T>;
    }
    // console.log('cache missed -------',)
    return this.sendGetRequest(url, options);
  }

  public post<T>(
    url: string,
    data: any,
    options = this.options_
  ): Observable<T> {
    return this.http.post<T>(url, data);
  }

  public put<T>(
    url: string,
    data: any,
    options = this.options_
  ): Observable<T> {
    return this.http.put<T>(url, data).pipe();
  }

  public patch<T>(
    url: string,
    data: any,
    options = this.options_
  ): Observable<T> {
    return this.http.patch<T>(url, data).pipe();
  }

  public delete<T>(url: string, options = this.options_): Observable<T> {
    return this.http.delete<T>(url, options).pipe(
      catchError((err) => {
        throw err;
      }),
      map((response: HttpEvent<T>) => {
        if (response instanceof HttpResponse) {
          return response.body as T;
        }
        throw new Error('Unexpected response type');
      })
    );
  }

  private sendGetRequest<T>(
    url: string,
    options = this.options_
  ): Observable<T> {
    return this.http.get<T>(url);
  }
}
