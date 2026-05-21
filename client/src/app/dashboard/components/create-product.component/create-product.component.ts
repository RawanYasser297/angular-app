import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';


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

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.form = this.fb.group({
      title: '',
      price: '',
      stock: '',
      desc: '',
      slug: '',
      category: '',
      session:''
    });
  }


  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  submit() {
    const formData = new FormData();
    const formValue = this.form.value;
    this.errorMessage = '';
    this.successMessage = '';

    formData.append('title', formValue.title ?? ' ');
    formData.append('description', formValue.desc ?? ' ');
    formData.append('price', formValue.price ?? ' ');
    formData.append('stock', formValue.stock ?? ' ');
    formData.append('slug', formValue.slug ?? ' ');
    formData.append('category', formValue.category ?? ' ');
    formData.append('session', formValue.session ?? ' ');
    
  
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
          session: '',
        });
        this.selectedFiles = [];
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = err.error?.error || 'Unable to create product.';
      },
    });
  }
}
