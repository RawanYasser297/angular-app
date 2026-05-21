import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Progress } from '../../client/components/progress/progress';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/global';
import { IProgressRes } from '../models/progress.model';

@Injectable({
  providedIn: 'root',
})
export class ProgressServices {
  private api = `${environment.apiURL}progress`;

  constructor(private http: HttpClient) {}

  getProgress(): Observable<IProgressRes> {
    return this.http.get<IProgressRes>(this.api);
  }

  updateProgress(data: Progress): Observable<IProgressRes> {
    return this.http.put<IProgressRes>(this.api, data);
  }
  
  createProgress(data: Progress): Observable<IProgressRes> {
    return this.http.post<IProgressRes>(this.api, data);
  }
}
