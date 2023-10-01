
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Employee } from 'src/app/shared/employee';
import { EmployeeType } from 'src/app/shared/employeetype';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  name!: string;
  surname!: string;
  cellNumber!: string;
  idNumber!: string;
  email!: string;
  employeeTypes: EmployeeType[] = [];
  employeeType: any;
  employeeTypeID: any;
  errorMessage: string = "";
  employeeForm!: FormGroup;


  constructor(private dataService: DataService,
    private route: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }


  ngOnInit(): void {

    this.getTypesFromAPI();
    this.buildForm();

  }


  private getTypesFromAPI() {
    this.dataService.GetAllEmployeeTypes().subscribe((result: any) => {
      let response = result as EmployeeType[];
      this.employeeTypes = response;
    });
  }

  private buildForm() {
    this.employeeForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]*$/)]],
      surname: ["", [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]*$/)]],
      email: ["", [Validators.required, Validators.email]],
      cellNumber: ["", [Validators.required, Validators.pattern(/^[0][0-9]{9}$/)]],//^[0][0-9]{10}$
      idNumber: ["", [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],//^[0-9]{10}$
      employeeTypeID: ["", [Validators.required]]

    })
  }

  cancel() {
    this.employeeForm.reset();
    this.route.navigate(['/employee'])
  }

  AddEmployee(): void {

    if (this.employeeForm.invalid) {
      this.errorMessage = "Please provide all required fields";
      return;
    }

    this.errorMessage = "";

    const employee: {

      name: string,
      surname: string,
      idNumber: string,
      email: string,
      cellNumber: string,
      employeeTypeID: number

    } = {
      name: this.employeeForm.value.name!,
      surname: this.employeeForm.value.surname!,
      email: this.employeeForm.value.email!,
      cellNumber: this.employeeForm.value.cellNumber!,
      idNumber: this.employeeForm.value.idNumber!,
      employeeTypeID: this.employeeForm.value.employeeTypeID || 0, // Use the Elvis operator to handle possible undefined value
    };

    const existingEmployee = this.employees.find(
      (employee) => employee.idNumber === this.employeeForm.value.idNumber
    );

    if (existingEmployee != undefined) {
      this.errorMessage = "An employee with this ID number already exists."
      return;
    }
    else {

      this.dataService.AddEmployee(employee).subscribe(() => {
        this.showSnackbar(`Employee added successfully`, 'success-snackbar');
        this.route.navigate(['/employee']);
      },
        (error) => {
          // Handle the error response here, if needed
          console.error('Error adding employee:', error);
          this.showSnackbar(`Employee could not be added`, 'error-snackbar');
          this.errorMessage = 'Error adding employee: ' + error;
        }
      )
    }
  }
  getErrorMessage(controlName: string) {
    const control = this.employeeForm.get(controlName);

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

  showSnackbar(message: string, panelClass: string) {
		this.snackBar.open(message, 'Close', {
		  duration: 6000,
		  panelClass: [panelClass],
		});
	  };

}
