import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Shared } from './shared/shared';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet,Shared],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
