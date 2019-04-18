import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {
  //gender = 'male';
  //isActive = true;
  //department = 1;
  employee: Employee
  panel_Title:string
  @ViewChild('employeeForm') public createEmployeeFrom: NgForm;


  /**
   * constructor
   * @param employeeSerivce 
   * @param router 
   * @param activateRoute 
   */
  constructor(private employeeSerivce: EmployeeService, private router: Router,
    private activateRoute: ActivatedRoute) { }

  /**
   * Department Class
   */
  departments: Department[] = [
    { id: "1", name: 'HR' },
    { id: "2", name: 'IT' },
    { id: "3", name: 'DEV' },
    { id: "4", name: 'MG' }
  ]

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id');
      this.getEmployee(id);
    })
  }


  /**
   * getEmployee
   * @param id 
   */
  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: null,
        password: null,
        confirmPassword: null,
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: null,
        isActive: null,
        photoPath: null,
      }
      this.createEmployeeFrom.reset();
      this.panel_Title="Create Employee";
    } else {
      this.panel_Title="Edit Employee";
      this.employee = Object.assign({}, this.employeeSerivce.getEmployeeWithID(id));
      console.log('Obj====>' + JSON.stringify(this.employee));
    }
  }

  /**
   * saveEmployee
   */
  saveEmployee(): void {
    const newEmployee: Employee = Object.assign({}, this.employee);
    this.employeeSerivce.saveEmployee(newEmployee);
    this.createEmployeeFrom.reset();
    this.router.navigate(['list']);
  }
}
