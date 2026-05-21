import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/global';
import {
  ITestimonial,
  ITestimonialResponse,
  ITestimonialsResponse,
} from '../models/testimonial.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonialsService {
  private readonly api = `${environment.apiURL}testimonials`;

  constructor(private http: HttpClient) {}

  getAcceptedTestimonials() {
    return this.http.get<ITestimonialsResponse>(this.api);
  }

  createTestimonial(data: Partial<ITestimonial>) {
    return this.http.post<ITestimonialResponse>(this.api, data);
  }

  getAllTestimonials() {
    return this.http.get<ITestimonialsResponse>(`${this.api}/admin`);
  }

  reviewTestimonial(id: string, status: 'accepted' | 'rejected') {
    return this.http.patch<ITestimonialResponse>(`${this.api}/${id}/review`, { status });
  }
}
