import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';


@Component({
  selector: 'app-admin.products.page',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.products.page.html',
  styleUrl: './admin.products.page.css',
})
export class AdminProductsPage  implements OnInit {

  form!: FormGroup;
  selectedFiles: File[] = [];
  productId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [''],
      price: [''],
      slug: [''],
    });
  }

  checkSlug() {
    const slug = this.form.get('slug')?.value;

    if (!slug) return;

    this.productService.getBySlug(slug).subscribe({
      next: (res) => {
        const product = res.data;

        if (product) {
          this.form.patchValue(product);
          this.productId = product._id;
          this.isEditMode = true;
        } else {
          this.isEditMode = false;
          this.productId = null;
        }
      },
      error: () => {
        this.isEditMode = false;
        this.productId = null;
      },
    });
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  submit() {
    if (this.isEditMode && this.productId) {
      this.productService
        .updateProduct(this.productId, this.form.value)
        .subscribe((res) => console.log('Updated', res));
    } else {
      const formData = new FormData();
      
      formData.append('title', this.form.value.title);
      formData.append('price', this.form.value.price);
      formData.append('slug', this.form.value.slug);

      this.selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      this.productService.createProduct(formData).subscribe((res) => console.log('Created', res));
    }
  }
}
