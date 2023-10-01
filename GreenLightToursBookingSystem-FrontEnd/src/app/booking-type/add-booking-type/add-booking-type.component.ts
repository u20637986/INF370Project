import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { BookingType } from 'src/app/shared/bookingtype';

@Component({
  selector: 'app-add-booking-type',
  templateUrl: './add-booking-type.component.html',
  styleUrls: ['./add-booking-type.component.scss']
})
export class AddBookingTypeComponent{

  bookingTypeForm!:FormGroup;

  name!: string;
  description!: string;
  bookingTypes: BookingType[] = [];

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
    this.bookingTypeForm = this.fb.group({
      name: ['',[ Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]*$/)]], // Letters and numbers],
      description: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]+$/)]], // Letters and numbers],
    });
  }

  onSubmit(): void {

    if (this.bookingTypeForm.invalid) {
      this.errorMessage = "Please provide all required fields";
      return;
    }
    this.errorMessage = '';

    const bookingType: {
      name: string,
      description: string,
    } =
    {
      name: this.bookingTypeForm.value.name,
      description: this.bookingTypeForm.value.description
    };

    const existingBookingType= this.bookingTypes.find(
      (bookingType)=> bookingType.name===this.bookingTypeForm.value.name
    );

    if(existingBookingType!=undefined){
      this.errorMessage="A booking type with this name already exists.";
    }

    else{
    this.dataService.AddBookingType(bookingType)
      .subscribe(() => {
        console.log('Booking type added successfully:');
        this.showSnackbar(`Booking type added successfully`, 'success-snackbar');
        this.route.navigate(['/booking-type']);
      },
        (error) => {
          // Handle the error response here, if needed
          console.error('Error adding booking type:', error);
          this.showSnackbar(`booking type could not be added`, 'error-snackbar');
          this.errorMessage = 'Error adding booking type: ' + error;
        })
  }
}
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

  cancel() {
    this.route.navigate(['/booking-type'])
  }
}
