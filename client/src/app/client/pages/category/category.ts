import { Component } from '@angular/core';
import { Filter } from '../../shared/components/filter/filter';

@Component({
  selector: 'app-category',
  imports: [Filter],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {}
