import { Inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string;

  constructor(@Inject(API_BASE_URL) baseUrl: string) {
    this.apiUrl = baseUrl;
  }

  isAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem('isAuthenticated') ?? '') as boolean;
  }
}
