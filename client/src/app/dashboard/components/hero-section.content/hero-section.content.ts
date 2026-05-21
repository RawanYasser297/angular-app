import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../../core/services/hero-service';
import { ICreateHero, IHeroRes } from '../../../core/models/hero.content.model';
import { environment } from '../../../../environments/global';
@Component({
  selector: 'app-hero-section.content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-section.content.html',
  styleUrl: './hero-section.content.css',
})
export class HeroSectionContent implements OnInit {
  form;
  heroId: string | null = null;
  selectedFile: File | null = null;
  environment =environment
  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
  ) {
    this.form = this.fb.nonNullable.group({
      title: [''],
      subtitle: [''],
      backgroundImage: [''],
    });
  }

  ngOnInit(): void {
    this.loadHero();
  }

  loadHero() {
    this.heroService.getHero().subscribe({
      next: (res: IHeroRes) => {
        if (res?.data) {
          this.form.patchValue(res.data);
          this.heroId = res.data._id;
        }
      },
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;
    }
  }

  submit() {
    const formValue: ICreateHero = this.form.getRawValue();

    const formData = new FormData();
    formData.append('title', formValue.title);
    formData.append('subtitle', formValue.subtitle);

    if (this.selectedFile) {
      formData.append('backgroundImage', this.selectedFile);
    }

    console.log('FILE:', this.selectedFile);

    if (this.heroId) {
      this.heroService.updateHero(this.heroId, formData).subscribe({
        next: (data) => {
          alert('Hero Updated ✅');
          console.log(data);
        },
      });
    }
  }
}
