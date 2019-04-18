import { CanDeactivate } from "@angular/router";
import { CreateEmployeeComponent } from "./create-employee.component";
import { Injectable } from "@angular/core";

@Injectable()
export class CreateEmployeeGuardService implements CanDeactivate<CreateEmployeeComponent>{
    canDeactivate(component: CreateEmployeeComponent): boolean{
        if(component.createEmployeeFrom.dirty){
            return confirm('Are you sure want to discard changes?')
        }
        return true
    }
}