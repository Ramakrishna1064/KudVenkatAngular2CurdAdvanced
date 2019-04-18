import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

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
  }

  /**
   * handleNotify
   * @param employeeData 
   */
  handleNotify(employeeData: Employee) {
    this.employeeData = employeeData;
  }

  /**
   * deleteEmployee
   * @param empId 
   */
  deleteEmployee(empId:number){
    const findIdex = this.filteredEmployees.findIndex(e=>e.id===empId);
    if(findIdex!=-1){
      this.filteredEmployees.splice(findIdex,1)
    }
  }

  ngOnInit() {
    //this.employees = this.employeeSerivce.getEmployees1();
    this.employeeSerivce.getEmployees().subscribe((empList)=>{
      this.employees=empList;
    });
    this.employeeDisplay = this.employees[0];
    this.filteredEmployees = this.employees;
    console.log('---->' + this.routers.snapshot.queryParamMap.has('searchTerm'));
    console.log('---->' + this.routers.snapshot.queryParamMap.get('searchTerm'));
    console.log('---->' + this.routers.snapshot.queryParamMap.getAll('searchTerm'));
    console.log('---->' + this.routers.snapshot.queryParamMap.keys);
    if (this.routers.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this.routers.snapshot.queryParamMap.get('searchTerm')
    } else {
      this.filteredEmployees = this.employees;
    }
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
  // goToDetails(employeeId: number) {
  //   this.router.navigate(['/deatils', employeeId], {
  //     queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
  //   });
  // }


  /**
   * getFilteredArrayList
   * @param searchTeam 
   */
  getFilteredArrayList(searchTeam: string) {
    return this.employees.filter(employee => employee.name.
      toLowerCase().indexOf(searchTeam.toLowerCase()) !== -1);
  }
}
