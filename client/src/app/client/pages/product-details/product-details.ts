import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../../core/models/products.model';
import { ProductService } from '../../../core/services/product.service';
import { environment } from '../../../../environments/global';
import { CartServices } from '../../../core/services/cart.services';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,RouterLink],
templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  constructor(
    private route: ActivatedRoute,
    private _productServices: ProductService,
    private _cdr:ChangeDetectorRef,
    private cartService:CartServices,
    private router:Router

  ) {}
  product!: IProduct;
  environment=environment;
  quantity: number = 1;
  selectedImage: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');

      if (slug) {
        this._productServices.getBySlug(slug).subscribe((res) => {
          this.product = res.data;
          console.log(this.product);
          this.selectedImage = this.product.images?.[0];
          this._cdr.detectChanges();
        });
      }
    });
  }

  changeImage(img: string) {
    this.selectedImage = img;
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(slug: string): void {
    console.log(slug)
  this.cartService.addToCart(slug).subscribe({
    next: () => {
      console.log('Added to cart ✅');
      this.router.navigate(['/cart']);
    },
    error: (err) => {
      console.error(err);
    }
  });
}
}
