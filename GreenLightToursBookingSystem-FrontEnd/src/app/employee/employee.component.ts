import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../shared/employee';
import { DataService } from '../service/GLBSdataservice';
import { VMemployee } from '../shared/VMemployee';
import { EmployeeType } from '../shared/employeetype';
import { VMtravelPackage } from '../shared/VMtravelpackage';
import { TravelPackageStatus } from '../shared/travelPackageStatus';
import { forkJoin, map } from 'rxjs';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  employees:VMemployee []=[]
  employeeTypess:EmployeeType []=[]
  x:any[]=[]

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllEmployees()
    console.log(this.GetAllEmployees)

  }

  GetAllEmployees() {
    this.dataService.GetAllEmployees().subscribe((employeeList: any[]) => {
      const observables = employeeList.map((element) =>
        this.dataService.GetAllEmployeeTypes().pipe(
          map((employeeTypesList: any[]) => {
            const employeeType = employeeTypesList.find(
              (x) => x.employeeTypeID === element.employeeTypeID
            );
            return {
              employeeID: element.employeeID,
              name: element.name,
              surname: element.surname,
              email: element.email,
              idNumber: element.idNumber,
              cellNumber: element.cellNumber,
              employeeType: employeeType || { name: 'Unknown' }, // Default value if not found
            };
          })
        )
      );
  
      forkJoin(observables).subscribe((results) => {
        this.employees = results;
      });
    });

    
    console.log('employees:'+ this.employees)
  }
  

  DeleteEmployee(EmployeeID: Number){
    this.dataService.DeleteEmployee(EmployeeID).subscribe(result => {
      window.location.reload();
      });
    }

    EditEmployee(employeeID:Number)
  {
    this.dataService.setSelectedEmployee(employeeID);
    this.router.navigate(['/edit-employee']);
  }

}
