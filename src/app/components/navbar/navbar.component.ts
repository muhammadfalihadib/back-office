import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  get currentRoute() {
    return this.router.url ?? '';
  }

  isHomeRoute(): boolean {
    return this.currentRoute === '/';
  }

  isEmployeeRoute(): boolean {
    return this.currentRoute.startsWith('/employee');
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToEmployee() {
    this.router.navigate(['/employee']);
  }

  logout() {
    this.authService.logout();
  }
}
