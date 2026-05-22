import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Category, CategoryMap } from '../../../core/models/category';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent {
  form;
  selectedFiles: File[] = [];
  errorMessage = '';
  successMessage = '';

  categoryMap: CategoryMap = {
    men: ['t-shirts', 'shirts', 'hoodies', 'jeans'],
    women: ['dresses', 'tops', 'skirts', 'jeans'],
    children: ['t-shirts', 'shorts', 'sets'],
    teenager: ['t-shirts', 'hoodies', 'jeans'],
  };

  filteredSubCategories: string[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.form = this.fb.group({
      title: [''],
      price: [''],
      stock: [''],
      desc: [''],
      slug: [''],
      category: [''],
      subCategory:[''],
      session: [''],
    });
  }

  ngOnInit(): void {
  this.form.get('category')?.valueChanges.subscribe((value: string | null) => {
    
    if (!value) {
      this.filteredSubCategories = [];
      return;
    }

    
    const category = value as Category;

    this.filteredSubCategories = this.categoryMap[category];

    this.form.get('subCategory')?.setValue('');
  });
}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  submit() {
    const formData = new FormData();
    const formValue = this.form.value;

    this.errorMessage = '';
    this.successMessage = '';

    formData.append('title', formValue.title ?? '');
    formData.append('description', formValue.desc ?? '');
    formData.append('price', String(formValue.price ?? ''));
    formData.append('stock', String(formValue.stock ?? ''));
    formData.append('slug', formValue.slug ?? '');
    formData.append('category', formValue.category ?? '');
    formData.append('subCategory', formValue.subCategory ?? ''); // ✅ ADD
    formData.append('session', formValue.session ?? '');

    this.selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.successMessage = 'Product created successfully.';

        this.form.reset({
          title: '',
          price: '',
          stock: '',
          desc: '',
          slug: '',
          category: '',
          subCategory: '', // ✅ reset
          session: '',
        });

        this.filteredSubCategories = []; // 👈 مهم
        this.selectedFiles = [];
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error?.error || 'Unable to create product.';
      },
    });
  }
}
