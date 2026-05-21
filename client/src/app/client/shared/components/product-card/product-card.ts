import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() id: number = 0;
   @Input() title: string = '';
  @Input() price: number = 0;
  @Input() image: string = '';
  @Input() slug: string = '';


  stars = [1, 2, 3, 4, 5];
}
