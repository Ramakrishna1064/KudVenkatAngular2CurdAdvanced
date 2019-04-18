import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-list-employees-details',
  templateUrl: './list-employees-details.component.html',
  styleUrls: ['./list-employees-details.component.css']
})
export class ListEmployeesDetailsComponent implements OnInit {

  employee: Employee;
  private _id: number;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit() {
    //const id = this.route.snapshot.params['id'];
    this.route.paramMap.subscribe(params => {
      this._id = +params.get('id');
      console.log('Details Id--->'+this._id);
      this.employee = this.employeeService.getEmployeeWithID(this._id);
    });
  }

  viewNext() {
    if (this._id < 3) {
      this._id = this._id + 1;
    } else {
      this._id = 1;
    }
    this.router.navigate(['/deatils', this._id],{
      queryParamsHandling:'preserve'
    })
  }

  goBack(){
    this.router.navigate(['/list', {'id':this.employee.id}]);
  }
}
