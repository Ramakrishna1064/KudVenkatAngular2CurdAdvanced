import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee-information',
  templateUrl: './display-employee-information.component.html',
  styleUrls: ['./display-employee-information.component.css']
})
export class DisplayEmployeeInformationComponent implements OnInit {

  @Input() employee: Employee;
  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() notifydeleteEmployee: EventEmitter<number> = new EventEmitter<number>();
  @Input() searchTerm: string;
  confirmDelete=false;
  selectedITem: number;

  constructor(private routes: ActivatedRoute, private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.selectedITem = +this.routes.snapshot.paramMap.get('id');
  }

  handleClick() {
    this.notify.emit(this.employee);
  }

  // ngOnChanges(change: SimpleChanges) {
  //   const previoseValue = <Employee>change.employee.previousValue;
  //   const currentValue = <Employee>change.employee.currentValue;
  //   console.log('previouse value--->' + (previoseValue ? previoseValue.name : 'NULL'))
  //   console.log('current value--->' + currentValue.name)
  // }

  getEmployeeNameAndGender(): string {
    return this.employee.name + '---->' + this.employee.gender;
  }

  viewEmployee() {
    console.log('----->EmployeeId' + this.employee.id)
    this.router.navigate(['/deatils', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
    });
  }

  editEmployee() {
    this.router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee() {
    this.confirmDelete=true
    this.employeeService.deleteEmployeeWithId(this.employee.id);
    this.notifydeleteEmployee.emit(this.employee.id);
  }
}
