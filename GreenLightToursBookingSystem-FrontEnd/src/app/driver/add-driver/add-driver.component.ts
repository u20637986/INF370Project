
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Driver } from 'src/app/shared/driver';
import { Employee } from 'src/app/shared/employee';
import { licenseCode } from 'src/app/shared/licenseCode';


@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  driverForm!: FormGroup;
  drivers: Driver[] = [];
  licenseCodes: licenseCode[] = [];
  licenseCode: any;
  licenseCodeID: any;
  employees: Employee[] = [];
  employee: any;
  employeeID: any;
  errorMessage: string = "";
  searchIdNumber: string = '';
  selectedEmployee: Employee | null = null;


  constructor(private dataService: DataService, private router: Router, private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getLicenseCodes();
    this.getEmployees();
    this.buildForm();
  }

  private getLicenseCodes() {
    this.dataService.GetAllLicenseCodes().subscribe((result: any) => {
      let response = result as licenseCode[];
      this.licenseCodes = response;
    })
  }


  private getEmployees() {
    this.dataService.GetAllEmployees().subscribe((result: any) => {
      let response = result as Employee[];
      this.employees = response;
    })
  }

  private buildForm() {
    this.driverForm = this.fb.group({
      employeeID: ["", Validators.required],
      licenseID: ["", Validators.required]
    });
  }

  cancel() {
    this.router.navigate(['/driver'])
  }


  AddDriver(): void {

    if (this.driverForm.invalid) {
      this.errorMessage = "Please provilde all required fields";
      return;
    }

    this.errorMessage = '';

    const driver: {
      licenseCodeID: number,
      employeeID: number
    } = {
      licenseCodeID: this.driverForm.value.licenseCodeID,
      employeeID: this.driverForm.value.employeeID
    };

    const existingDriver = this.drivers.find(
      (driver) => driver.employeeID === this.driverForm.value.employeeID
    );

    if (existingDriver != undefined) {
      this.errorMessage = "A driver with this employee ID number already exists.";
    }

    else {
      this.dataService.AddDriver(driver).subscribe(() => {

        this.showSnackbar(`Driver added successfully`, 'success-snackbar');
        this.router.navigate(['/driver']);
      },
        (error) => {
          this.showSnackbar(`Driver could not be added`, 'error-snackbar');
          this.errorMessage = 'Error adding driver: ' + error;
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

  searchEmployee(): void {
    this.dataService.searchEmployeeByIdNumber(this.searchIdNumber).subscribe(
      (employee: Employee) => {
        this.selectedEmployee = employee;
      },
      (error) => {
        console.error('Error searching for employee:', error);
        this.showSnackbar('Employee not found', 'error-snackbar');
        this.selectedEmployee = null;
      }
    );
  }

  selectEmployee(employeeID: number): void {
    // Set the selected employee's ID in the form
    this.driverForm.get('employeeID')?.setValue(employeeID);
    this.selectedEmployee = null; // Clear the selected employee card
  }


}