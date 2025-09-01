import { CommonModule } from '@angular/common';
import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee.service';
import { MatButtonModule } from '@angular/material/button';
import { RupiahCurrencyPipe } from '../../pipe/rupiah.pipe';

@Component({
  selector: 'app-employee-detail',
  imports: [
    CommonModule,
    MatButtonModule,
    RupiahCurrencyPipe,
  ],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
})
export class EmployeeDetailComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  
  data: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = (param.get('id') as string) || null;
      if (id) {
        this.loadData(id);
      }
    });
  }

  loadData(id: any) {
    this.employeeService.getDetail(id).subscribe({
      next: (response: any) => {
        this.data = response;
      }
    });
  }

  backToList() {
    this.router.navigate(['/employee']);
  }
}
