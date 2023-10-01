import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';

@Component({
  selector: 'app-update-booking-type',
  templateUrl: './update-booking-type.component.html',
  styleUrls: ['./update-booking-type.component.scss']
})
export class UpdateBookingTypeComponent {

  errorMessage:string="";

  bookingTypeForm= new FormGroup({
    name:new FormControl('', [
			Validators.required,
			Validators.pattern(/^[A-Z][a-zA-Z ]*$/), // Letters
		  ]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9 .]+$/), // Letters
        ]),
  })

  bookingTypeID!:number;
  bookingType:any;

  constructor(
		private dataService: DataService,
		private router: Router,
		private route: ActivatedRoute,
    private snackBar:MatSnackBar
	) { }


  async ngOnInit(): Promise<void> {

		this.bookingTypeID = +this.route.snapshot.params['bookingTypeID'];

		console.log('Booking type ID:', this.bookingTypeID);

		this.dataService.getBookingType(this.bookingTypeID).subscribe((result: any) => {
			this.bookingType = result;

      this.bookingTypeForm.patchValue({
        name:this.bookingType.name,
        description:this.bookingType.description
      })
    })
}

cancel() {
  this.router.navigate(['/booking-type'])
}

onSubmit() {

  if (this.bookingTypeForm.invalid) {
    this.errorMessage = "Please provide all required fields";
    return;
  }

  this.errorMessage='';

  const bookingType:{
    name:string,
    description:string
  }={
    name:this.bookingTypeForm.value.name!,
    description:this.bookingTypeForm.value.description!
  };

  this.dataService.UpdateBookingType(this.bookingTypeID, bookingType)
  .subscribe((result: any) => {
    if (result) {
      this.errorMessage = "Booking Type has been updated";
      this.showSnackbar(`LBooking Type updated successfully`, 'success-snackbar');
      this.router.navigate(['/booking-type']);
    }

    else () => {
      // Handle the error response here, if needed
      console.error('Error updating booking type.');
      this.showSnackbar(`Booking Type could not be updated`, 'error-snackbar');
      this.errorMessage='Error updating booking type. Please  check your connection and try again.';
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
  const control = this.bookingTypeForm.get(controlName);

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
