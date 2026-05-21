import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { environment } from '../../../../environments/global';
import { IProduct } from '../../../core/models/products.model';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './all-products.html',
  styleUrl: './all-products.css',
})
export class AllProducts {
  constructor(
    private _productService: ProductService,
    private _cdr: ChangeDetectorRef,
  ) {}

  environment = environment;

  myProducts!: IProduct[];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';

  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: (res) => {
        this.myProducts = res.data;
        this.filteredProducts = res.data; 
        this._cdr.detectChanges();
        console.log(this.myProducts);
      },
    });
  }

  onSearch(event: any) {
  this.searchTerm = event.target.value.toLowerCase();
  this.applyFilters();
}

onCategoryChange(event: any) {
  this.selectedCategory = event.target.value;
  this.applyFilters();
}
onStatusChange(event: any) {
  this.selectedStatus = event.target.value;
  this.applyFilters();
}

applyFilters() {
  this.filteredProducts = this.myProducts.filter(product => {

    const matchesSearch =
      product.title.toLowerCase().includes(this.searchTerm);

    const matchesCategory =
      this.selectedCategory
        ? product.category === this.selectedCategory
        : true;

    const matchesStatus =
      this.selectedStatus === 'inStock'
        ? product.stock > 0
        : this.selectedStatus === 'outOfStock'
        ? product.stock === 0
        : true;

    return matchesSearch && matchesCategory && matchesStatus;
  });
}
}
