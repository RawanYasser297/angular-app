import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TestimonialsComponent } from './testimonials.component';
import { TestimonialsService } from '../../../core/services/testimonials.service';

describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsComponent],
      providers: [
        {
          provide: TestimonialsService,
          useValue: {
            getAcceptedTestimonials: () => of({ data: [] }),
            createTestimonial: () => of({ data: null }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
