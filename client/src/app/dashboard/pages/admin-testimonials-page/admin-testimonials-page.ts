import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ITestimonial } from '../../../core/models/testimonial.model';
import { TestimonialsService } from '../../../core/services/testimonials.service';

@Component({
  selector: 'app-admin-testimonials-page',
  imports: [CommonModule],
  templateUrl: './admin-testimonials-page.html',
  styleUrl: './admin-testimonials-page.css',
})
export class AdminTestimonialsPage {
  testimonials: ITestimonial[] = [];
  isLoading = true;
  activeId = '';
  errorMessage = '';

  constructor(
    private testimonialsService: TestimonialsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  review(id: string | undefined, status: 'accepted' | 'rejected'): void {
    if (!id) {
      return;
    }

    this.activeId = id;
    this.testimonialsService.reviewTestimonial(id, status).subscribe({
      next: () => {
        this.activeId = '';
        this.cdr.detectChanges();
        this.loadTestimonials();
      },
      error: () => {
        this.activeId = '';
        this.cdr.detectChanges();
      },
    });
  }

  trackById(index: number, item: ITestimonial): string {
    return item._id ?? `${item.name}-${index}`;
  }

  private loadTestimonials(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.testimonialsService.getAllTestimonials().subscribe({
      next: (res) => {
        this.testimonials = [...(res.data ?? [])].sort((a, b) => {
          const first = new Date(b.createdAt ?? 0).getTime();
          const second = new Date(a.createdAt ?? 0).getTime();
          return first - second;
        });
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.testimonials = [];
        this.errorMessage =
          err?.status === 403
            ? 'This page is available only for admin accounts.'
            : 'Unable to load testimonials right now.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
