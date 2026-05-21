import { Injectable } from '@angular/core';
import { environment } from '../../../environments/global';
import { HttpClient } from '@angular/common/http';
import { CartResponse, ICartItem, MessageResponse } from '../models/cart.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private API_URL = `${environment.apiURL}cart`;
  constructor(private http: HttpClient) {}
  // 🟢 Get Cart
  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(this.API_URL);
  }

  // 🟢 Add To Cart
  addToCart(slug: string): Observable<CartResponse> {
    return this.http.post<CartResponse>(this.API_URL, { slug });
  }

  updateQuantity(productSlug: string, quantity: number) {
    return this.http.put(this.API_URL, { productSlug, quantity });
  }

  removeFromCart(productSlug: string) {
    return this.http.delete(`${this.API_URL}/${productSlug}`);
  }
  // 🟢 Clear Cart
  clearCart(): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.API_URL}/clear`);
  }
}
