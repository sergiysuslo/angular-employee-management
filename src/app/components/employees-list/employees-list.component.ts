import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/common/employee';
import { EmployeeService } from 'src/app/services/employee.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from 'src/app/employee-dialog/employee-dialog.component';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'action'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  employees: Employee[];

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute,
     private dialog: MatDialog, private notificationService: NotificationsService) { }

  ngOnInit(): void {
        this.listEmployees();
  }

  listEmployees() {
    this.employeeService.getEmployeeList().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  editEmployee(row : Employee) {
    this.dialog.open(EmployeeDialogComponent, {
      width:'30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.listEmployees();
      }
    })
  }

  deleteEmployee(employee: Employee) {
    this.notificationService.warn('Mitarbeiter gelöscht:', employee.firstName + ' ' + employee.lastName, {
      timeOut: 2000,
      showProgressBar: true
    } );
    this.employeeService.deleteEmployee(employee.id).subscribe();

  }

  openDialog() {
    this.dialog.open(EmployeeDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save') {
        this.listEmployees();
        this.notificationService.success('Mitarbeiter hinzugefügt');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
