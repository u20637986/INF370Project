import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { EmployeeType } from 'src/app/shared/employeetype';

@Component({
  selector: 'app-update-employee-type',
  templateUrl: './update-employee-type.component.html',
  styleUrls: ['./update-employee-type.component.scss']
})
export class UpdateEmployeeTypeComponent implements OnInit {

  EmployeeTypeForm = new FormGroup(
    {
        name: new FormControl(''),
        duration: new FormControl(''),
        description: new FormControl('')
    })
    employeeType:any;
  constructor(private dataService: DataService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getEmployeeType(+this.route.snapshot.params['id']).subscribe(result => {
      this.employeeType = result
      this.EmployeeTypeForm.patchValue({
        name: this.employeeType.name,
        description: this.employeeType.description
      });
  })
  }


  cancel(){
    this.router.navigate(['/employee-type'])
  }
  /*UpdateEmployeeType() {
    this.dataService.UpdateEmployeeType(this.employeeType).subscribe({
      next: (employeeType) => {
        employeeType.name = this.EmployeeTypeForm.value.name;
        employeeType.description = this.EmployeeTypeForm.value.description;

        // Assuming 'employeeTypeId' is the identifier for the employee type being updated
        this.router.navigate(['/employee-Type']);
      }
    });
  }*/



}

