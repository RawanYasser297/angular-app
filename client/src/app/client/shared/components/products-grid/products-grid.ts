import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/global';
import { ProductService } from '../../../../core/services/product.service';
import { IProduct } from '../../../../core/models/products.model';
import { ProductCardSkeletonComponent } from '../../../../components/product-card-skeleton.component/product-card-skeleton.component';

@Component({
  selector: 'app-products-grid',
  imports: [CommonModule, ProductCard, RouterLink,ProductCardSkeletonComponent],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.css',
})
export class ProductsGrid {
  isLoading = true;
  constructor(
    private _productService: ProductService,
    private _cdr: ChangeDetectorRef,
  ) {}

  environment = environment;

  myProducts!: IProduct[];

  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.myProducts = res.data;
        this._cdr.detectChanges();
        console.log(this.myProducts);
      },
      error: () => (this.isLoading = false),
    });
  }
}
