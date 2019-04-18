import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employess-list-resolve-gaurd',
  templateUrl: './employess-list-resolve-gaurd.component.html',
  styleUrls: ['./employess-list-resolve-gaurd.component.css']
})
export class EmployessListResolveGaurdComponent implements OnInit {

  employees: Employee[];
  employeeDisplay: Employee;
  arrayIndex = 1
  employeeData: Employee;
  _searchParam: string;
  filteredEmployees: Employee[];

  set searchTerm(value: string) {
    this._searchParam = value;
    this.filteredEmployees = this.getFilteredArrayList(this._searchParam);
  }

  get searchTerm(): string {
    return this._searchParam;
  }

  constructor(private employeeSerivce: EmployeeService,
    private router: Router, private routers: ActivatedRoute) {
    this.employees = this.routers.snapshot.data['employeeList'];
    if (this.routers.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this.routers.snapshot.queryParamMap.get('searchTerm')
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  handleNotify(employeeData: Employee) {
    this.employeeData = employeeData;
  }

  ngOnInit() {
    //this.employees = this.employeeSerivce.getEmployees();
    // this.employeeSerivce.getEmployees().subscribe((empList)=>{
    //   this.employees=empList;
    // })
    // this.employeeDisplay = this.employees[0];
    // this.filteredEmployees = this.employees;
    // console.log('---->' + this.routers.snapshot.queryParamMap.has('searchTerm'));
    // console.log('---->' + this.routers.snapshot.queryParamMap.get('searchTerm'));
    // console.log('---->' + this.routers.snapshot.queryParamMap.getAll('searchTerm'));
    // console.log('---->' + this.routers.snapshot.queryParamMap.keys);
    // if (this.routers.snapshot.queryParamMap.has('searchTerm')) {
    //   this.searchTerm = this.routers.snapshot.queryParamMap.get('searchTerm')
    // } else {
    //   this.filteredEmployees = this.employees;
    // }
  }

  /**
   * moveToNext
   */
  moveToNext(): void {
    if (this.arrayIndex <= 2) {
      this.employeeDisplay = this.employees[this.arrayIndex];
      this.arrayIndex++;
    } else {
      this.employeeDisplay = this.employees[0];
      this.arrayIndex = 1;
    }
  }

  /**
   * changeEmployeeName
   */
  changeEmployeeName() {
    //this.employees[0].name='Mark'
    // const newEmployeeArray: Employee[] = Object.assign([], this.employees);
    // newEmployeeArray[0].name = 'Mark';
    // this.employees = newEmployeeArray;
    this.employees[0].name = 'Mark'
    this.filteredEmployees = this.getFilteredArrayList(this._searchParam);
  }

  /**
   * goToDetails
   * @param employeeId 
   */
  goToDetails(employeeId: number) {
    this.router.navigate(['/deatils', employeeId], {
      queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
    });
  }


  /**
   * getFilteredArrayList
   * @param searchTeam 
   */
  getFilteredArrayList(searchTeam: string) {
    return this.employees.filter(employee => employee.name.
      toLowerCase().indexOf(searchTeam.toLowerCase()) !== -1);
  }

}
