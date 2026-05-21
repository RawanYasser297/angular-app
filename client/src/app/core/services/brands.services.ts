import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/global';
import { IBrandRes } from '../models/brands.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsServices {
  private api = `${environment.apiURL}brands`;

  constructor(private http: HttpClient) {}

  // ✅ GET
  getBrands(): Observable<IBrandRes> {
    return this.http.get<IBrandRes>(this.api);
  }

  // ✅ GET  5 brands available for user 
  showBrands(): Observable<IBrandRes> {
    return this.http.get<IBrandRes>(this.api);
  }

  // ✅ CREATE
  createBrands(data: FormData): Observable<IBrandRes> {
    return this.http.post<IBrandRes>(this.api, data);
  }

  // ✅ UPDATE
  updateBrands(data: FormData): Observable<IBrandRes> {
    return this.http.put<IBrandRes>(this.api, data);
  }

  toggleLogo(logoId: string) {
    return this.http.put(`${this.api}/${logoId}`, {});
  }
}
