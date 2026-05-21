import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressServices } from '../../../core/services/progress.services';

@Component({
  selector: 'app-progress-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './progress-dashboard.html',
  styleUrl: './progress-dashboard.css',
})
export class ProgressDashboard implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private progressService: ProgressServices,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      internationalBrands: [''],
      highQualityProducts: [''],
      happyCustomers: [''],
    });
    this.loadData();
  }

  loadData(){
    this.progressService.getProgress().subscribe((res) => {
      this.form.patchValue(res.data);
      console.log(res);
      
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.progressService.updateProgress(this.form.value).subscribe(() => {
      alert('Updated successfully ✅');
    });
  }
}
