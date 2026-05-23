import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Category = 'men' | 'women' | 'children';

interface CategoryItem {
  name: string;
  open: boolean;
  items: string[];
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  priceRange = 200;

  categories: CategoryItem[] = [
    {
      name: 'men',
      open: false,
      items: ['t-shirts', 'shirts', 'hoodies', 'jeans'],
    },
    {
      name: 'women',
      open: false,
      items: ['dresses', 'tops', 'skirts', 'jeans'],
    },
    {
      name: 'children',
      open: false,
      items: ['t-shirts', 'shorts', 'sets'],
    },
  ];

  selectedCategory: Category | '' = '';
  selectedSubCategory: string = '';

  @Output() filterChange = new EventEmitter<{
    category: string;
    subCategory: string;
    maxPrice: number;
  }>();

  toggleCategory(cat: CategoryItem) {
    cat.open = !cat.open;
  }

  
  selectSubCategory(sub: string, parent: CategoryItem) {
    this.selectedCategory = parent.name as Category;
    this.selectedSubCategory = sub;
  }

  applyFilter() {
    console.log(this.filterChange)
    this.filterChange.emit({
      category: this.selectedCategory,
      subCategory: this.selectedSubCategory,
      maxPrice: this.priceRange,
    });
  }
}