import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY='token';
  private readonly USER_ID_KEY='userId';

  constructor(private readonly router: Router) { }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  setUserId(id: string): void {
    localStorage.setItem(this.USER_ID_KEY, id);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
  }
}
