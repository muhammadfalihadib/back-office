import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  private readonly router = inject(Router);

  errorObject: any = {
    '404': 'Not Found',
    '403': 'Forbidden',
    '401': 'Unauthorized',
  };

  errorCode = '404';

  goToHome() {
    this.router.navigate(['/']);
  }
}
