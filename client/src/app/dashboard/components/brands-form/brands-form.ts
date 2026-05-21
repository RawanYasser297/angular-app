import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrandsServices } from '../../../core/services/brands.services';
import { environment } from '../../../../environments/global';
import { IBrand, IBrandRes, ILogo } from '../../../core/models/brands.model';

@Component({
  selector: 'app-brands-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './brands-form.html',
  styleUrl: './brands-form.css',
})
export class BrandsForm implements OnInit {
  form;
  selectedFiles: File[] = [];
  previews: string[] = [];
  existingImages: string[] = [];
  newImages: string[] = [];
  logos: any[] = [];
  fileError: string = '';
  toggleError: string = '';
  environment = environment;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandsServices,
    private _cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      logos: [null],
    });
  }

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.brandService.getBrands().subscribe((res) => {
      if (!res.data) return;
      this.logos = res.data.logos;
      this._cdr.detectChanges();
    });
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files) return;

    const files = Array.from(input.files);

    const total = files.length + this.selectedFiles.length + this.logos.length;

    if (total > 5) {
      this.fileError = 'Maximum 5 logos allowed';
      return;
    }

    // ✅ reset error
    this.fileError = '';

    files.forEach((file: File) => {
      this.selectedFiles.push(file);

      const reader = new FileReader();

      reader.onload = ({ target }: ProgressEvent<FileReader>) => {
        if (typeof target?.result === 'string') {
          this.newImages.push(target.result);
        }
      };

      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.newImages.splice(index, 1);
  }

  toggle(logo: ILogo) {
    const visibleCount = this.logos.filter((l) => l.show).length;

    if (!logo.show && visibleCount >= 5) {
      this.toggleError = 'Only 5 logos can be visible';
      return;
    }

    this.toggleError = '';

    this.brandService.toggleLogo(logo._id).subscribe(() => {
      logo.show = !logo.show;
      this._cdr.detectChanges();
    });
  }

  onSubmit() {
    const formData = new FormData();

    if (this.selectedFiles.length < 1 && !this.selectedFiles.length) {
      this.fileError = 'Add at least one image';
    }

    this.selectedFiles.forEach((file) => {
      formData.append('logos', file);
    });

    console.log(this.selectedFiles);

    this.brandService.updateBrands(formData).subscribe((res) => {
      console.log(res);
      this.selectedFiles = [];
      this.loadBrands();
    });
  }
}
