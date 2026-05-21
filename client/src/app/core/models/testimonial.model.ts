export interface ITestimonial {
  _id?: string;
  name: string;
  role?: string;
  message: string;
  rating?: number;
  status?: 'pending' | 'accepted' | 'rejected';
  reviewedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  reviewedBy?: {
    _id?: string;
    name?: string;
  };
}

export interface ITestimonialsResponse {
  data: ITestimonial[];
}

export interface ITestimonialResponse {
  data: ITestimonial;
}
