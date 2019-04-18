import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { EmployeeService } from "./employee.service";

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate {
  constructor(private employeeService: EmployeeService, private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isEmployeeExist = this.employeeService.getEmployeeWithID(+route.paramMap.get('id'));
    if (isEmployeeExist) {
      return true;
    } else {
      this._router.navigate(['/notfound']);
      return false;
      
    }
  }
}
