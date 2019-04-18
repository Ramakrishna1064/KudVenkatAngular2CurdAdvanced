import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ConfirmEqualValidatorDirective } from './shared/confirm_validator_directive';
import { ConfirmGroupEqualValidatorDirective } from './shared/confirm_group_validator_directive';
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeInformationComponent } from './employees/display-employee-information.component';
import { CreateEmployeeGuardService } from './employees/create-employee-gaurd-service';
import { ListEmployeesDetailsComponent } from './employees/list-employees-details.component';
import { EmployeeFilterPipe } from './employees/employee.filter.pipe';
import { EmployessListResolveGaurdComponent } from './employees/employess-list-resolve-gaurd.component';
import { EmployessListResolveGuard } from './employees/employee-list-resolve-guard-service';
import { PagenotFoundComponent } from './employees/pagenot-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard-service';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListEmployeesComponent
    //resolve: { employeeList: EmployessListResolveGuard }
  },
  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeGuardService]
  },
  {
    path: 'deatils/:id',
    component: ListEmployeesDetailsComponent,
    //canActivate: [EmployeeDetailsGuardService]
  },
  { path: 'notfound', component: PagenotFoundComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    ConfirmEqualValidatorDirective,
    ConfirmGroupEqualValidatorDirective,
    DisplayEmployeeInformationComponent,
    ListEmployeesDetailsComponent,
    EmployeeFilterPipe,
    EmployessListResolveGaurdComponent,
    PagenotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService, CreateEmployeeGuardService,
    EmployessListResolveGuard, EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
