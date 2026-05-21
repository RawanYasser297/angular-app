import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductRes, IProductsRes } from '../models/products.model';
import { environment } from '../../../environments/global';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private api = `${environment.apiURL}products`;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<IProductsRes>(this.api);
  }

  getBySlug(slug: string) {
    return this.http.get<IProductRes>(`${this.api}/slug/${slug}`);
  }

  createProduct(data: FormData) {
    return this.http.post<IProductRes>(this.api, data);
  }

  updateProduct(id: string, data: any) {
    return this.http.put<IProductsRes>(`${this.api}/${id}`, data);
  }
}
