import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';

@Component({
  selector: 'app-edit-license-code',
  templateUrl: './edit-license-code.component.html',
  styleUrls: ['./edit-license-code.component.scss']
})
export class EditLicenseCodeComponent {
  errorMessage:string="";

  licenseCodeForm= new FormGroup({
    name:new FormControl('', [
			Validators.required,
			Validators.pattern(/^[A-Z][a-zA-Z ]*$/), // Letters
		  ]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9 .]+$/), // Letters
        ]),
  })

  licenseCodeID!:number;
  licenseCode:any;

  constructor(
		private dataService: DataService,
		private router: Router,
		private route: ActivatedRoute,
    private snackBar:MatSnackBar
	) { }


  async ngOnInit(): Promise<void> {

		this.licenseCodeID = +this.route.snapshot.params['licenseCodeID'];

		console.log('License Code ID:', this.licenseCodeID);

		this.dataService.getLicenseCode(this.licenseCodeID).subscribe((result: any) => {
			this.licenseCode = result;

      this.licenseCodeForm.patchValue({
        name:this.licenseCode.name,
        description:this.licenseCode.description
      })
    })
}

cancel() {
  this.router.navigate(['/license-code'])
}

onSubmit() {

  if (this.licenseCodeForm.invalid) {
    this.errorMessage = "Please provide all required fields";
    return;
  }

  this.errorMessage='';

  const licenseCode:{
    name:string,
    description:string
  }={
    name:this.licenseCodeForm.value.name!,
    description:this.licenseCodeForm.value.description!
  };

  this.dataService.editLicenseCode(this.licenseCodeID, licenseCode)
  .subscribe((result: any) => {
    if (result) {
      this.errorMessage = "License code has been updated";
      this.showSnackbar(`License code updated successfully`, 'success-snackbar');
      this.router.navigate(['/license-code']);
    }

    else () => {
      // Handle the error response here, if needed
      console.error('Error updating license code.');
      this.showSnackbar(`License code could not be updated`, 'error-snackbar');
      this.errorMessage='Error updating help license code. Please  check your connection and try again.';
    }
  })
}
/*,
private snackBar:MatSnackBar
*/

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
}

