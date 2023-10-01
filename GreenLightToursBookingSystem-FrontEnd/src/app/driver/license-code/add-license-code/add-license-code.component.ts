import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { licenseCode } from 'src/app/shared/licenseCode';

@Component({
  selector: 'app-add-license-code',
  templateUrl: './add-license-code.component.html',
  styleUrls: ['./add-license-code.component.scss']
})
export class AddLicenseCodeComponent {

  licenseCodeForm!:FormGroup;

  name!: string;
  description!: string;
  categories: licenseCode[] = [];

  errorMessage: string = "";

  constructor(
    private dataService: DataService,
    private route: Router,
    private fb: FormBuilder,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.buildForm();

  }

   private buildForm() {
    this.licenseCodeForm = this.fb.group({
      name: ['',[ Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]*$/)]], // Letters and numbers],
      description: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]+$/)]], // Letters and numbers],
    });
  }

  onSubmit(): void {

    if (this.licenseCodeForm.invalid) {
      this.errorMessage = "Please provide all required fields";
      return;
    }
    this.errorMessage = '';

    const licenseCode: {
      name: string,
      description: string,
    } =
    {
      name: this.licenseCodeForm.value.name,
      description: this.licenseCodeForm.value.description
    };

    this.dataService.addLicenseCode(licenseCode)
      .subscribe(() => {
        console.log('License code added successfully:');
        this.showSnackbar(`License code added successfully`, 'success-snackbar');
        this.route.navigate(['/license-code']);
      },
        (error) => {
          // Handle the error response here, if needed
          console.error('Error adding license code:', error);
          this.showSnackbar(`License code could not be added`, 'error-snackbar');
          this.errorMessage = 'Error adding license code: ' + error;
        })
  }
  showSnackbar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: [panelClass],
    });
  };

  getErrorMessage(controlName: string) {
    const control = this.licenseCodeForm.get(controlName);

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
/*,
private snackBar:MatSnackBar
*/
  cancel() {

    this.licenseCodeForm.reset();
    this.route.navigate(['/license-code']);

  }

}