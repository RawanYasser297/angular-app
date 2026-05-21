import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [CommonModule,FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  priceRange = 200;

  categories = [
    {
      name: 'Men',
      open: false,
      items: ['T-shirts', 'Shirts', 'Hoodies', 'Jeans'],
    },
    {
      name: 'Women',
      open: false,
      items: ['Dresses', 'Tops', 'Skirts', 'Jeans'],
    },
    {
      name: 'Children',
      open: false,
      items: ['T-shirts', 'Shorts', 'Sets'],
    },
  ];

  selectedCategory = '';

  toggleCategory(cat: any) {
    cat.open = !cat.open;
  }

  selectSubCategory(sub: string) {
    this.selectedCategory = sub;
  }

  applyFilter() {
    console.log({
      category: this.selectedCategory,
      price: this.priceRange,
    });
  }
}
