import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { environment } from '../../../environments/global';
import { IUser } from '../models/user.mdel';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API = `${environment.apiURL}user`;
  private readonly tokenKey = 'auth_token';
  isLoggedInState = !!localStorage.getItem(this.tokenKey);

  constructor(private http: HttpClient) {}

  signup(data: IUser) {
    return this.http.post<{ token?: string }>(`${this.API}`, data, {
      withCredentials: true,
    }).pipe(tap((response) => this.storeToken(response.token)));
  }

  login(data: { email: string; password: string }) {
    return this.http.post<{ token?: string }>(`${this.API}/login`, data, {
      withCredentials: true,
    }).pipe(tap((response) => this.storeToken(response.token)));
  }

  getMe() {
    return this.http.get<{ status: string; data: IUser }>(`${this.API}/me`, {
      withCredentials: true,
    });
  }

  isAdmin() {
    return this.getMe().pipe(map((response) => response.data?.role === 'admin'));
  }

  logout() {
    return this.http
      .post(`${this.API}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.clearSession()));
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  clearSession() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInState = false;
  }

  private storeToken(token?: string | null) {
    if (!token) return;

    localStorage.setItem(this.tokenKey, token);
    this.isLoggedInState = true;
  }
}
