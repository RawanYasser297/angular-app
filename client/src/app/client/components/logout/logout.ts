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
      this.router.navigate(['/login']);
    },
    error: () => {
      // حتى لو حصل error، نعمل redirect برضه
      this.router.navigate(['/login']);
    }
  });
}
}
