import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  username: string = '';

  ngOnInit(): void {
    this.getName();
  }

  getName() {
    let user = this.authService.parseToken();
    this.username = user?.username ?? 'user';
  }

  goToEmployee() {
    this.router.navigate(['/employee'])
  }
}
