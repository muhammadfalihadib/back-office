import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { noAuthGuard } from './guards/no-auth/no-auth.guard';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'employee',
        component: EmployeeListComponent,
      },
      {
        path: 'employee/add',
        component: EmployeeFormComponent,
      },
      {
        path: 'employee/:id',
        component: EmployeeDetailComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'error/:errorCode',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];
