import { Injectable } from '@angular/core';
import { environment } from '../../../environments/global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateHero, IHeroRes, IUpdateHero } from './../models/hero.content.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private api = `${environment.apiURL}hero`;

  constructor(private http: HttpClient) {}

  getHero(): Observable<IHeroRes> {
    return this.http.get<IHeroRes>(this.api);
  }

  createHero(data: FormData): Observable<IHeroRes> {
    return this.http.post<IHeroRes>(this.api, data);
  }

  updateHero(id: string, data: FormData): Observable<IHeroRes> {
    return this.http.put<IHeroRes>(`${this.api}/${id}`, data);
  }
}
