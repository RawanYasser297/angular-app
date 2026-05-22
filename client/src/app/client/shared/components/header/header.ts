import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../../core/services/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  mobileMenuOpen = false;
  shopDropdownOpen = false;
  isLoading = true;

  constructor(
    private authService: Auth,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.authService.getMe().subscribe();
    this.isLoading = false;
  }

  isLoggedIn = () => this.authService.isLoggedIn$;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleShopDropdown() {
    this.shopDropdownOpen = !this.shopDropdownOpen;
  }

  closeMenus() {
    this.mobileMenuOpen = false;
    this.shopDropdownOpen = false;
  }

  // Close on outside click
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-container')) {
      this.closeMenus();
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('logout done');
      },
      error: (err) => {
        console.log(err);
      },
    }); // يمسح التوكن + state
  }
}
