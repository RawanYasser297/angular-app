import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shared',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './shared.html',
  styleUrl: './shared.css',
})
export class Shared {
  constructor(private router: Router) {}

  navigate(event: any) {
    const value = event.target.value;

    if (value) {
      this.router.navigate([value]);
    }
  }
}
