import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/global';
import { IUser } from '../models/user.mdel';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API = `${environment.apiURL}user`;
  private userSubject = new BehaviorSubject<IUser | null>(null);
  user$ = this.userSubject.asObservable();
  constructor(private http: HttpClient) {}

  signup(data: IUser) {
    return this.http.post(`${this.API}`, data, {
      withCredentials: true,
    });
  }

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.API}/login`, data);
  }

  getMe() {
  return this.http.get(`${this.API}/me`).pipe(
    tap((res: any) => {
      this.userSubject.next(res.data);
    }),
    catchError(() => {
      this.userSubject.next(null);
      return of(null);
    })
  );
}

  isAdmin() {
    return this.getMe().pipe(map((response) => response.data?.role === 'admin'));
  }

  get isLoggedIn$() {
    return this.user$.pipe(map((user) => !!user));
  }

  logout() {
    return this.http
      .post(
        `${this.API}/logout`,
        {},
      )
      .pipe(
        tap((res) => {
          console.log(res);
          this.userSubject.next(null);
        }),
      );
  }
}
