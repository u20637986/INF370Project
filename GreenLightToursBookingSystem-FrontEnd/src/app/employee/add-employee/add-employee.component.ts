import { Component , OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Employee} from 'src/app/shared/employee';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee= {
    employeeID:0,
    name: '',
    surname:'',
    email:'',
    cellNumber:'',
    iDnumber:'',
  };

  EmployeeForm = new FormGroup(
    {
        name: new FormControl(''),
        surname: new FormControl(''),
        email: new FormControl(''),
        cellNumber: new FormControl(''),
        iDnumber: new FormControl('')
    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/employee'])
    }
    AddEmployee(){
      this.dataService.AddEmployee(this.employee).subscribe({
        next:(employee) => {

         employee.name = this.EmployeeForm.value.name;
         employee.surname = this.EmployeeForm.value.surname;
         employee.email = this.EmployeeForm.value.email;
         employee.cellNumber = this.EmployeeForm.value.cellNumber;
         employee.iDnumber = this.EmployeeForm.value.iDnumber;

         this.router.navigate(['/employee'])
        }
      })
    }


  }
