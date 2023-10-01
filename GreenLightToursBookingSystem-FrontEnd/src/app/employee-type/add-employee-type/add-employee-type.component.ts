import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { EmployeeType } from 'src/app/shared/employeetype';

@Component({
  selector: 'app-add-employee-type',
  templateUrl: './add-employee-type.component.html',
  styleUrls: ['./add-employee-type.component.scss']
})
export class AddEmployeeTypeComponent implements OnInit {

  employeeType: EmployeeType = {
    employeeTypeID:0,
    name: '',
    description:''
  };

  EmployeeTypeForm = new FormGroup(
    {
        name: new FormControl(''),
        description: new FormControl('')
    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/employee-type'])
    }
    AddEmployeeType(){
      this.dataService.AddEmployeeType(this.employeeType).subscribe({
        next:(employeeType) => {

         employeeType.name = this.EmployeeTypeForm.value.name;
         employeeType.description = this.EmployeeTypeForm.value.description;

         this.router.navigate(['/employee-type'])
        }
      })
    }


  }



