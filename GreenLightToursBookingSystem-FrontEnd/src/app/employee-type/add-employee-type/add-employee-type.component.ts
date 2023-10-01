import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { EmployeeType } from 'src/app/shared/employeetype';

@Component({
  selector: 'app-add-employee-type',
  templateUrl: './add-employee-type.component.html',
  styleUrls: ['./add-employee-type.component.scss']
})
export class AddEmployeeTypeComponent implements OnInit {

  employeeTypeForm!: FormGroup;
  name!: string;
  description!: string;
  employeeTypes: EmployeeType[] = [];

  errorMessage: string = "";

  constructor(private dataService: DataService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.employeeTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]*$/)]],//Letters only
      description: ['', Validators.required],

    });
  }

  cancel() {
    this.router.navigate(['/employee-type'])
  }
  addEmployeeType(): void {
    console.log(this.employeeTypeForm)
    if (this.employeeTypeForm.invalid) {
      this.errorMessage = "Please provide all required fields";
      return;
    }

    this.errorMessage = '';

    const employeeType: {
      name: string,
      description: string
    } = {
      name: this.employeeTypeForm.value.name!,
      description: this.employeeTypeForm.value.description!
    };

    const existingEmployeeType=this.employeeTypes.find(
      (employeeType)=>employeeType.name===this.employeeTypeForm.value.name
    );

    if(existingEmployeeType!=undefined)
    {
      this.errorMessage="An employee type with this name already exists.";
      return;
    }
    else{
    this.dataService.AddEmployeeType(employeeType).subscribe(() => {
      // Handle the success response here, if needed
      console.log('Employee Type added successfully:');
      this.showSnackbar(`Employee added successfully`, 'success-snackbar');
      this.router.navigate(['/employee-type']);
    },
      (error) => {
        // Handle the error response here, if needed
        console.error('Error adding employee type:', error);
        this.showSnackbar(`Employee could not be added`, 'error-snackbar');
        this.errorMessage = 'Error adding employee type: ' + error;
      }
    )
  }
}
  showSnackbar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: [panelClass],
    });
  };

  getErrorMessage(controlName: string) {
    const control = this.employeeTypeForm.get(controlName);

    if (!control) {
      return ''; // Return an empty string if the control is not found
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (controlName === 'name') {
      if (control.hasError('pattern') || control.hasError('required')) {
        return 'Enter a valid name. It must start with a capital letter(e.g.,Name)';
      }
      // Add additional error checks for price if needed
    }

    if (controlName === 'description') {
      if (control.hasError('pattern') || control.hasError('required')) {
        return 'Description is required.';
      }
      // Add additional error checks for price if needed
    }


    return '';
  }

}
