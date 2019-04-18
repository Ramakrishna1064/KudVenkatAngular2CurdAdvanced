import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Employee } from "../models/employee.model";
import { EmployeeService } from "./employee.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class EmployessListResolveGuard implements Resolve<Employee[]>{
  constructor(private employeeService: EmployeeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
    return this.employeeService.getEmployees();
  }
}
