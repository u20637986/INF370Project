import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../shared/employee';
import { DataService } from '../service/GLBSdataservice';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  employees: Employee[]=[]

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllEmployees()
  }

  GetAllEmployees()
  {
    this.dataService.GetAllEmployees().subscribe(result => {
      let employeeList:any[] = result
      employeeList.forEach((element) => {
        this.employees.push(element)
      });
    })
  }

  DeleteEmployee(EmployeeID: Number){
    this.dataService.DeleteEmployeeType(EmployeeID).subscribe(result => {
      window.location.reload();
      });
    }

}
