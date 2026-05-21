import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.isLoggedInState = false;
        this.router.navigate(['/login']);
      },
    });
  }
}
