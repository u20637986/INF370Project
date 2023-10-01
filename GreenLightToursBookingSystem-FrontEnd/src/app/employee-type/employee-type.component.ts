import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeType } from '../shared/employeetype';
import { DataService } from '../service/GLBSdataservice';


@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.component.html',
  styleUrls: ['./employee-type.component.scss']
})
export class EmployeeTypeComponent implements OnInit {
  employeeTypes:EmployeeType[] = []

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllEmployeeTypes()
  }

  GetAllEmployeeTypes()
  {
    this.dataService.GetAllEmployeeTypes().subscribe(result => {
      let employeeTypeList:any[] = result
      employeeTypeList.forEach((element) => {
        this.employeeTypes.push(element)
      });
    })
  }

  DeleteEmployeeType(EmployeeTypeID: Number){
    this.dataService.DeleteEmployeeType(EmployeeTypeID).subscribe(result => {
      window.location.reload();
      });
    }
}
