import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct {
  productForm!: FormGroup;
  productId!: string;
  slug!: string;
  selectedFiles: File[] = [];


  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.slug = this._route.snapshot.paramMap.get('slug')!;

    this.productForm = this.fb.group({
      title: [''],
      price: [''],
      description: [''],
      category: [''],
      stock: [''],
      slug: [''],
      images: [[]]
    });

    this.getProduct()
  }


   onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  getProduct() {
    this._productService.getBySlug(this.slug).subscribe(res => {
      this.productForm.patchValue(res.data);
      this.productId=res.data._id
    });
  }

  submit() {
    console.log(this.productId,this.productForm.value)
    
    this._productService
      .updateProduct(this.productId, this.productForm.value)
      .subscribe({
        next: (res) => console.log('Updated:', res),
        error: (err) => console.error(err)
      });
  }
}