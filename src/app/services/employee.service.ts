import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Employee } from '../common/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl : string = 'http://localhost:8080/api/employees';

  employeeArray: Employee[];

  constructor(private httpClient: HttpClient) { }

  getEmployeeList() : Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl);

  }

  addEmployee(employee: Employee) : Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseUrl, employee);
  }

  updateEmployee(employee: Employee) : Observable<Employee> {
    return this.httpClient.put<Employee>(this.baseUrl, employee);
  }

  deleteEmployee(employeeId: number) : Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + '/' + employeeId);
  }
}

