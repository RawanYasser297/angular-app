import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/global';
import { ILogo } from '../../../core/models/brands.model';
import { IHero } from '../../../core/models/hero.content.model';
import { IProduct } from '../../../core/models/products.model';
import { BrandsServices } from '../../../core/services/brands.services';
import { HeroService } from '../../../core/services/hero-service';
import { ProductService } from '../../../core/services/product.service';
import { TestimonialsComponent } from '../../components/testimonials.component/testimonials.component';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ProductCard, TestimonialsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly environment = environment;
  hero: IHero | null = null;
  visibleBrands: ILogo[] = [];
  newestProducts: IProduct[] = [];
  isHeroLoading = true;
  isBrandsLoading = true;
  isProductsLoading = true;

  constructor(
    private heroService: HeroService,
    private brandsService: BrandsServices,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadHero();
    this.loadBrands();
    this.loadProducts();
  }

  private loadHero() {
    this.heroService.getHero().subscribe({
      next: (res) => {
        this.hero = res.data;
        this.isHeroLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isHeroLoading = false;
      },
    });
  }

  private loadBrands() {
    this.brandsService.showBrands().subscribe({
      next: (res) => {
        this.visibleBrands = (res.data?.logos ?? []).filter((logo) => logo.show);
        this.isBrandsLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isBrandsLoading = false;
      },
    });
  }

  private loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.newestProducts = [...(res.data ?? [])]
          .sort((a, b) => {
            const first = new Date(a.createdAt ?? 0).getTime();
            const second = new Date(b.createdAt ?? 0).getTime();
            return second - first;
          })
          .slice(0, 6);
        this.isProductsLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isProductsLoading = false;
      },
    });
  }
}
