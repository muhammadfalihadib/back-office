import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url: string = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) {}

  getList(params?: any) {
    return this.http.get(this.url, { params });
  }

  getDetail(id: string | number) {
    return this.http.get(`${this.url}/${id}`);
  }

  add(payload: any) {
    return this.http.post(this.url, payload);
  }

  edit(id: string | number, payload: any) {
    return this.http.patch(`${this.url}/${id}`, payload);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
