import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { IUser } from '../../../core/models/user.mdel';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private fb = inject(FormBuilder);

  loading = false;
  showPassword = false;
  showConfirm = false;
  submitError = '';

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  readonly form = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/),
        ],
      ],
      confirmPassword: ['', Validators.required],
      phoneNumbers: this.fb.array([this.createPhoneNumberGroup()]),
      addresses: this.fb.array([this.createLocationGroup()]),
    },
    {
      validators: [
        this.passwordMatchValidator,
        this.locationsValidator,
        this.phoneNumbersValidator,
      ],
    },
  );

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.form.get('phoneNumbers') as FormArray;
  }

  addLocation() {
    this.addresses.push(this.createLocationGroup());
  }

  removeLocation(index: number) {
    if (this.addresses.length === 1) {
      this.addresses.at(0).reset({
        addressLine: '',
        placeId: '',
      });
      return;
    }

    this.addresses.removeAt(index);
  }

  addPhoneNumber() {
    this.phoneNumbers.push(this.createPhoneNumberGroup());
  }

  removePhoneNumber(index: number) {
    if (this.phoneNumbers.length === 1) {
      this.phoneNumbers.at(0).reset({
        number: '',
      });
      return;
    }

    this.phoneNumbers.removeAt(index);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.submitError = '';

    const formValue = this.form.getRawValue();

    const userData: IUser = {
      name: formValue.name ?? '',
      email: formValue.email ?? '',
      password: formValue.password ?? '',
      confirmPassword: formValue.confirmPassword ?? '',
      phoneNumbers: (formValue.phoneNumbers ?? []).map((phone) => ({
        number: phone?.number ?? '',
      })),
      addresses: (formValue.addresses ?? []).map((address) => ({
        addressLine: address?.addressLine ?? '',
        placeId: '',
      })),
    };

    this.auth.signup(userData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.submitError = err.error?.message || 'Signup failed';
        this.loading = false;
      },
    });
  }

  trackLocation(index: number) {
    return index;
  }

  trackPhone(index: number) {
    return index;
  }

  private createLocationGroup() {
    return this.fb.group({
      addressLine: ['', Validators.required],
      placeId: [''],
    });
  }

  private createPhoneNumberGroup() {
    return this.fb.group({
      number: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9+\-\s()]{6,20}$/),
        ],
      ],
    });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;

    return password === confirm ? null : { mismatch: true };
  }

  private locationsValidator(control: AbstractControl): ValidationErrors | null {
    const locations = control.get('addresses') as FormArray | null;

    if (!locations || locations.length === 0) {
      return { locationsRequired: true };
    }

    const hasValidLocation = locations.controls.some((group) => {
      const addressLine = group.get('addressLine')?.value;
      return !!addressLine;
    });

    return hasValidLocation ? null : { locationsRequired: true };
  }

  private phoneNumbersValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumbers = control.get('phoneNumbers') as FormArray | null;

    if (!phoneNumbers || phoneNumbers.length === 0) {
      return { phoneNumbersRequired: true };
    }

    const hasValidPhone = phoneNumbers.controls.some((group) => {
      const number = group.get('number')?.value;
      return !!number;
    });

    return hasValidPhone ? null : { phoneNumbersRequired: true };
  }
}
