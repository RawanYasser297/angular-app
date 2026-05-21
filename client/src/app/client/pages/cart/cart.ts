import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ICartItem } from '../../../core/models/cart.model';
import { CommonModule } from '@angular/common';
import { CartServices } from '../../../core/services/cart.services';
import { environment } from '../../../../environments/global';
@Component({
  selector: 'app-cart',
  imports: [CommonModule],
templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit{
  cart: ICartItem[] = [];
  environment=environment

  constructor(private cartService: CartServices,private _cdr: ChangeDetectorRef,) {}

  ngOnInit(): void {
    this.loadCart();
  }

  // 🟢 Load cart أول مرة بس
  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        console.log(res.data)
        this.cart = res.data;
         this._cdr.detectChanges();
       
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // ➕ زيادة الكمية (Instant)
  increase(item: ICartItem): void {
    const oldQty = item.quantity;

    // 🔥 update UI فورًا
    item.quantity++;

    this.cartService.updateQuantity(item.product.slug, item.quantity).subscribe({
      error: () => {
        // ❌ rollback
        item.quantity = oldQty;
      },
    });
  }

  // ➖ تقليل الكمية (Instant)
  decrease(item: ICartItem): void {
    const oldQty = item.quantity;

    item.quantity--;

    // لو وصلت صفر احذف
    if (item.quantity <= 0) {
      this.remove(item.product.slug);
      return;
    }

    this.cartService.updateQuantity(item.product.slug, item.quantity).subscribe({
      error: () => {
        item.quantity = oldQty;
      },
    });
  }

  // 🗑 حذف منتج (Instant)
  remove(productSlug: string): void {
    const oldCart = [...this.cart];

    // 🔥 update UI فورًا
    this.cart = this.cart.filter((item) => item.product.slug !== productSlug);

    this.cartService.removeFromCart(productSlug).subscribe({
      error: () => {
        // ❌ rollback
        this.cart = oldCart;
      },
    });
  }

  // 💰 حساب subtotal
  getSubtotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // 💳 total مع الشحن
  getTotal(): number {
    const delivery = 15;
    return this.getSubtotal() + delivery;
  }

  // 🚀 تحسين performance
  trackBySlug(index: number, item: ICartItem): string {
    return item.product.slug;
  }
}
