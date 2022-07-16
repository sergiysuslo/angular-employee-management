import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup,FormBuilder, Validators} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  employeeForm: FormGroup;
  actionButton : string = 'Speichern';

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,
     private dialogRef: MatDialogRef<EmployeeDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
        firstName : ['', Validators.required],
        lastName : ['', Validators.required],
        email : ['', Validators.required]
    });

    if(this.editData){
      this.actionButton = 'Aktualisieren';
      this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeeForm.controls['email'].setValue(this.editData.email);
    }
  }

  addEmployee(){

    if(!this.editData) {
      if(this.employeeForm.valid) {
        this.employeeService.addEmployee(this.employeeForm.value).subscribe({
          next: (res) => {
            this.employeeForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
          }
        });
      }
    } else if(this.editData){
      if(this.employeeForm.valid) {
        this.employeeService.updateEmployee(this.employeeForm.value).subscribe({
          next: (res) => {
            this.employeeForm.reset();
            this.dialogRef.close('update');
          },
          error: () => {
          }
        });
      }
    }
  }


}
