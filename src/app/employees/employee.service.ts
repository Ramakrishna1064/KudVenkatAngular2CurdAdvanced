import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Observable, of } from 'rxjs';

@Injectable()
export class EmployeeService {

  private listOfemployees: Employee[] = [
    {
      id: 1,
      name: 'Hales',
      gender: 'male',
      email: 'Ram@gmail.com',
      phoneNumber: '8008824731',
      contactPreference: 'email',
      dateOfBirth: new Date('10/12/1991'),
      department: '1',
      isActive: true,
      photoPath: 'assets/imgs/image1.jpg',
    },
    {
      id: 2,
      name: 'Jordan',
      gender: 'male',
      email: 'Rahul@gmail.com',
      phoneNumber: '8008824732',
      contactPreference: 'phone',
      dateOfBirth: new Date('2/9/2002'),
      department: '3',
      isActive: true,
      photoPath: 'assets/imgs/image2.jpg',
    },
    {
      id: 3,
      name: 'Marry',
      gender: 'female',
      email: 'Rakesh@gmail.com',
      phoneNumber: '8008824733',
      contactPreference: 'email',
      dateOfBirth: new Date('04/03/1989'),
      department: '2',
      isActive: true,
      photoPath: 'assets/imgs/image3.jpg',
    }
  ];

  /**
  * getEmployees
  */
  // getEmployees(): Employee[] {
  //   return this.listOfemployees;
  // }


  /**
   * getEmployees
   */
  getEmployees(): Observable<Employee[]> {
    return of(this.listOfemployees);
  }

  getEmployees1(): Employee[] {
    return this.listOfemployees;
  }

  /**
   * saveEmployee
   * @param employee 
   */
  saveEmployee(employee: Employee): void {
    if (employee.id === null) {
      const maxID = this.listOfemployees.reduce(function(e1, e2) {
        return (e1.id > e2.id) ? e1 : e2
      }).id
      employee.id = maxID + 1;
      this.listOfemployees.push(employee);
    } else {
      const findIndex = this.listOfemployees.findIndex(e => e.id === employee.id);
      this.listOfemployees[findIndex] = employee;
    }
  }

  deleteEmployeeWithId(id: number) {
    const empId = this.listOfemployees.findIndex(e => e.id === id)
    if (empId != -1) {
      this.listOfemployees.splice(empId, 1);
    }
  }

  /**
   * 
   * @param employeeID 
   */
  getEmployeeWithID(employeeID: number): Employee {
    return this.listOfemployees.find(e => e.id === employeeID);
  }


  //https://api.github.com/search/repositories?q=angular
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
