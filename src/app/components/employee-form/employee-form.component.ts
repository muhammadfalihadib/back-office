import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-employee-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatRadioModule,
    NgSelectModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly router = inject(Router);

  formGroup!: FormGroup;
  today: Date = new Date();
  mode: string = 'add';
  groupOptions: any[] = [
    'Frontend',
    'Backend',
    'UI/UX',
    'QA',
    'DevOps',
    'System Analyst',
    'Project Manager',
    'Product Owner',
    'Scrum Master',
    'Leadership',
  ]

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.formGroup = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthDate: new FormControl(null, [Validators.required]),
      basicSalary: new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,3})?$/)]),
      status: new FormControl('Not Active', [Validators.required]),
      group: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.employeeService.add(this.formGroup?.value).subscribe({
      next: (response: any) => {
        if (response) {
          alert('Data saved successfully.');
          this.router.navigate(['/employee'])
        };
      },
      error: (err: any) => {
        alert(err?.message ?? 'Something is wrong.');
      }
    })
  }
  
  onCancel() {
    this.router.navigate(['/employee'])
  }

  handleDateChange(value: any) {
    this.formGroup.get('birthDate')?.patchValue(value?.getTime());
  }
  
  handleStatusChange() {
    // this.formGroup.get('birthDate')?.patchValue(value?.getTime());
  }

  get birthDate() {
    return this.formGroup.get('birthDate')?.value ? new Date(this.formGroup.get('birthDate')?.value) : null;
  }
}
