import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { DataService } from 'src/app/service/GLBSdataservice';
import { OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee';
import { EmployeeType } from 'src/app/shared/employeetype';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

  employeeTypes:EmployeeType[]=[]

  employee: Employee = {
    employeeID: 0,
    name: '',
    surname: '',
    email: '',
    idNumber: '',
    cellNumber: '',
    employeeTypeID: 0
  };

  constructor(
    private dataservice: DataService,
    private activated:ActivatedRoute,
    private router: Router,
  ) {}

  editEmployee: Employee = new Employee();
  
  updateEmployeeForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]*$/)]),
    surname: new FormControl('',[Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]*$/)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    idNumber: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{13}$/)]),
    cellNumber: new FormControl('',[Validators.required, Validators.pattern(/^[0][0-9]{9}$/)]),
    employeeTypeID: new FormControl('',[Validators.required]),

  })

  ngOnInit(): void {
      
    // GET THE ID FROM THE URL 
  this.activated.params.subscribe(params => { 

   //SEND OFF REQUEST TO DB TO FIND OBJECT DATA 
   this.dataservice.getEmployee(this.dataservice.getSelectedEmployee()).subscribe(response => { //SUBSCRIBE TO THE RESPONSE

    //MAP THE RESPONSE TP THE CURRENT EDITCOURSE OBJECT
    this.editEmployee = response as Employee;

    //MAP THE RESPONSE VALUES TO THE FORM 
    this.updateEmployeeForm.controls['name'].setValue(this.editEmployee.name);
    this.updateEmployeeForm.controls['surname'].setValue(this.editEmployee.surname);
    this.updateEmployeeForm.controls['email'].setValue(this.editEmployee.email);
    this.updateEmployeeForm.controls['idNumber'].setValue(this.editEmployee.idNumber);
    this.updateEmployeeForm.controls['cellNumber'].setValue(this.editEmployee.cellNumber);
    this.updateEmployeeForm.controls['employeeTypeID'].setValue(this.editEmployee.employeeTypeID);

   this.dataservice.GetAllEmployeeTypes().subscribe(result => {
    this.employeeTypes = result
   })
   
   })

  })
   }

    
   getErrorMessage(controlName: string) {
    const control = this.updateEmployeeForm.get(controlName);

    if (!control) {
      return ''; // Return an empty string if the control is not found
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (controlName === 'email') {
      if (control.hasError('pattern') || control.hasError('required')) {
        return 'Enter a valid email address (e.g.,exampleemail@gmail.com)';
      }
      // Add additional error checks for price if needed
    }

    if (controlName === 'name') {
      if (control.hasError('pattern') || control.hasError('required')) {
        return 'Enter a valid name. Name must start with a capital letter (e.g.,John)';
      }
      // Add additional error checks for price if needed
    }

    if (controlName === 'surname') {
      if (control.hasError('pattern') || control.hasError('required')) {
        return 'Enter a valid surname. Surname must start with a capital letter (e.g.,Smith)';
      }
      // Add additional error checks for price if needed
    }

    if (controlName === 'cellNumber') {
      if (control.hasError('pattern') || control.hasError('required')) {
        return 'Enter a valid cellphone numer with 10 digits, starting with "0" (e.g.,0123456789)';
      }
      // Add additional error checks for price if needed
    }

    if (controlName === 'idNumber') {
      if (control.hasError('pattern') || control.hasError('required')) {
        return 'Enter a valid ID Number. It must be exactly 13 digits with no letters, spaces or special characters. (e.g.,exampleemail@gmail.com)';
      }
      // Add additional error checks for price if needed
    }

    return '';
  }


   UpdateEmployees()
   {
   
if(this.updateEmployeeForm.valid)
{

 this.employee.employeeID = this.editEmployee.employeeID;
 this.employee.name = this.updateEmployeeForm.value.name;
 this.employee.surname = this.updateEmployeeForm.value.surname;
 this.employee.email = this.updateEmployeeForm.value.email;
 this.employee.idNumber = this.updateEmployeeForm.value.idNumber;
 this.employee.cellNumber =  this.updateEmployeeForm.value.cellNumber;
 this.employee.employeeTypeID = this.updateEmployeeForm.value.employeeTypeID;

this.dataservice.UpdateEmployee(this.editEmployee.employeeID,this.employee).subscribe((response:any) => {

 if(response.statusCode == 200)
 {
 
   this.router.navigate(['/employee'])
   
 }
 else
 {
   this.router.navigate(['/employee'])
 }
});
}
    
   }
   cancel() {
    this.router.navigate(['/employee']);
  }

  

}

