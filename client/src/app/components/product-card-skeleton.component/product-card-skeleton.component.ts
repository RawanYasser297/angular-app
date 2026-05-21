import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card-skeleton',
  imports: [CommonModule],
  templateUrl: './product-card-skeleton.component.html',
  styleUrl: './product-card-skeleton.component.css',
})
export class ProductCardSkeletonComponent {
  @Input() count: number = 6;
}
