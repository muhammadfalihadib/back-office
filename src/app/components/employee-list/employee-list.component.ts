import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../services/employee/employee.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly router = inject(Router);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'action',
    'fullName',
    'email',
    'group',
    'birthDate',
    'status',
  ];
  columnObj: { [k: string]: any } = {
    fullName: {
      display: 'Name',
      value: '',
    },
    email: {
      display: 'Email',
      value: '',
    },
    group: {
      display: 'Group',
      value: '',
    },
    birthDate: {
      display: 'Birth Date',
      type: 'date',
      value: '',
    },
    status: {
      display: 'Status',
      value: '',
    },
  };
  isLoading = false;
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  orderBy: string = '';
  columnOrder: string = '';
  keyword = new FormControl(null);
  showGroupFilter = new FormControl(false);
  groupFilter = {
    'Frontend': false,
    'Backend': false,
    'UI/UX': false,
    'QA': false,
    'DevOps': false,
    'System Analyst': false,
    'Project Manager': false,
    'Product Owner': false,
    'Scrum Master': false,
    'Leadership': false,
  }

  ngOnInit(): void {
    this.restoreState();
    this.loadData();
    this.subscribeSearch();
  }

  subscribeSearch() {
    this.keyword.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (value !== null) {
        this.loadData();
      }
    })
  }

  loadData() {
    this.isLoading = true;
    this.employeeService.getList().subscribe({
      next: (response: any) => {
        const data = response as any[];
        this.totalItems = data.length;
        this.dataSource.data = this.filterData(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
    });
  }

  filterData(data: any) {
    return data?.filter((item: any) => {
      const fullname = `${item?.firstName} ${item?.lastName}`.toLowerCase();
      const group = item?.group;

      const hasActiveGroups = Object.values(this.groupFilter).some(value => value === true);
      const groupMatched = hasActiveGroups ? (group && this.groupFilter[group as keyof typeof this.groupFilter] === true) : true;
      const keywordMatched = this.keyword?.value ? fullname.includes((this.keyword?.value as string).toLowerCase()) : true;

      return keywordMatched && groupMatched;
    });
  }

  onToggleChange() {
    if (!this.showGroupFilter?.value) {
      this.resetGroupFilter();
      this.loadData();
    }
  }

  onCheckboxChange(event: any, key: string) {
    (this.groupFilter as any)[key] = event?.checked;
    this.loadData();
  }

  onSortChange() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'fullName': 
          return `${data.firstName} ${data.lastName}`;
        default: 
          return data?.[sortHeaderId] ?? '';
      }
    };
  }

  onPageChange(event: PageEvent) {
    this.itemsPerPage = event.pageSize;    
    this.dataSource.paginator = this.paginator;
  }

  onClickAdd() {
    this.router.navigate(['/employee/add']);
  }

  onClickDetail(item: any) {
    this.savePageState();
    this.router.navigate([`/employee/${item?.id}`]);
  }

  onClickRefresh() {
    this.resetKeyword();
    this.resetGroupFilter();
    this.loadData();
  }
  
  resetKeyword(byClick: boolean = false) {
    this.keyword.reset();
    if (byClick) {
      this.loadData();
    }
  }

  resetGroupFilter() {
    Object.keys(this.groupFilter).forEach(key => {
      this.groupFilter[key as keyof typeof this.groupFilter] = false;
    });
  }

  savePageState() {
    const state = {
      keyword: this.keyword?.value,
      showGroupFilter: this.showGroupFilter?.value,
      groupFilter: this.groupFilter,
    }
    localStorage.setItem('state', JSON.stringify(state));
  }

  restoreState() {
    const state = localStorage.getItem('state');
    if (state) {
      const {keyword, showGroupFilter, groupFilter} = JSON.parse((state));
      this.keyword.patchValue(keyword);
      this.showGroupFilter.patchValue(showGroupFilter);
      Object.assign(this.groupFilter, groupFilter);
    }
  }
}
