import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITestimonial } from '../../../core/models/testimonial.model';
import { TestimonialsService } from '../../../core/services/testimonials.service';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  testimonials: ITestimonial[] = [];
  isLoading = true;
  isSubmitting = false;
  feedback = '';
  feedbackType: 'success' | 'error' | '' = '';
  readonly form;

  constructor(
    private fb: FormBuilder,
    private testimonialsService: TestimonialsService,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      role: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  ngOnInit(): void {
    this.loadTestimonials();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.feedback = '';
    this.feedbackType = '';

    const formValue = this.form.getRawValue();
    const payload: Partial<ITestimonial> = {
      name: formValue.name ?? '',
      role: formValue.role ?? '',
      message: formValue.message ?? '',
      rating: formValue.rating ?? 5,
    };

    this.testimonialsService.createTestimonial(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.feedback = 'Thanks! Your testimonial was sent for review.';
        this.feedbackType = 'success';
        this.form.reset({
          name: '',
          role: '',
          message: '',
          rating: 5,
        });
      },
      error: () => {
        this.isSubmitting = false;
        this.feedback = 'Something went wrong while sending your testimonial.';
        this.feedbackType = 'error';
      },
    });
  }

  trackById(index: number, item: ITestimonial): string {
    return item._id ?? `${item.name}-${index}`;
  }

  private loadTestimonials(): void {
    this.testimonialsService.getAcceptedTestimonials().subscribe({
      next: (res) => {
        this.testimonials = res.data ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.testimonials = [];
        this.isLoading = false;
      },
    });
  }
}
