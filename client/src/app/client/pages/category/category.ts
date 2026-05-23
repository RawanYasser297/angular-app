import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Filter } from '../../shared/components/filter/filter';
import { ProductsGrid } from '../../shared/components/products-grid/products-grid';
import { ProductService } from '../../../core/services/product.service';
import { IProduct } from '../../../core/models/products.model';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { environment } from '../../../../environments/global';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-category',
  imports: [Filter, ProductsGrid, CommonModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  isLoading = false;
  allProducts: IProduct[] = [];
  //filteredProducts: IProduct[] = [];
  environment = environment;

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.isLoading = true;

    this.productService.getProducts().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.allProducts = res.data;
        this.cdr.detectChanges();
      },
      error: () => (this.isLoading = false),
    });
  }

  onFilterChange(filters: { category?: string; subCategory?: string; maxPrice?: number }) {
    this.allProducts = this.allProducts.filter((product) => {
      const matchCategory = !filters.category || product.category === filters.category;

      const matchSubCategory = !filters.subCategory || product.subCategory === filters.subCategory;

      const matchPrice = !filters.maxPrice || product.price <= filters.maxPrice;

      console.log(matchCategory, matchSubCategory, matchPrice);
      return matchCategory && matchSubCategory && matchPrice;
    });
  }
}
