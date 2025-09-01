import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accountList: any[] = [
    {
      username: 'falih',
      password: 'Indocyber1',
    },
    {
      username: 'andri',
      password: 'Mandiri1',
    },
  ];

  constructor(private readonly router: Router) {}

  isAuthenticated(): boolean {
    let token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  login(payload: any) {
    if (this.authenticate(payload)) {
      this.setToken(JSON.stringify(payload));
    } else {
      alert('Login failed, please try again.');
    }
  }

  authenticate(value: any) {
    for (let account of this.accountList) {
      if (
        account.username === value?.username &&
        account.password === value?.password
      ) {
        return true;
      }
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('token') ?? '';
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.router.navigate(['/']);
  }

  parseToken() {
    let token = this.getToken();
    if (token) {
      return JSON.parse(token);
    }
    return '';
  }
}
