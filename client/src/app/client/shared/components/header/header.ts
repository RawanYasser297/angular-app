import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  mobileMenuOpen = false;
  shopDropdownOpen = false;

  constructor(private authService: Auth) {}

  get isLoggedIn() {
    return this.authService.isLoggedInState;
  }

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
  this.authService.logout(); // يمسح التوكن + state
}
}
