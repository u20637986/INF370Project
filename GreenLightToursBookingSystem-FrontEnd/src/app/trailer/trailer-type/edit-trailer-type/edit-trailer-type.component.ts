import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/trailer.service';

@Component({
  selector: 'app-edit-trailer-type',
  templateUrl: './edit-trailer-type.component.html',
  styleUrls: ['./edit-trailer-type.component.scss']
})
export class EditTrailerTypeComponent {

  errorMessage: string = "";

  trailerTypeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]*$/)]), // Letters
    description: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9 .]+$/), // Letters
    ]),
  })

  trailerTypeID!: number;
  trailerType: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }


  async ngOnInit(): Promise<void> {

    this.trailerTypeID = +this.route.snapshot.params['trailerTypeID'];

    console.log('Trailer Type ID:', this.trailerTypeID);

    this.dataService.getTrailerType(this.trailerTypeID).subscribe((result: any) => {
      this.trailerTypeID = result;

      this.trailerTypeForm.patchValue({
        name: this.trailerType.name,
        description: this.trailerType.description
      })
    })
  }

  cancel() {
    this.router.navigate(['/trailer-type'])
  }

  onSubmit() {

    if (this.trailerTypeForm.invalid) {
      this.errorMessage = "Please provide all required fields";
      return;
    }

    this.errorMessage = '';

    const trailerType: {
      name: string,
      description: string
    } = {
      name: this.trailerTypeForm.value.name!,
      description: this.trailerTypeForm.value.description!
    };

    this.dataService.editTrailerType(this.trailerTypeID, trailerType)
      .subscribe((result: any) => {
        if (result) {
          this.errorMessage = "Trailer type has been updated";
          this.showSnackbar(`Trailer type updated successfully`, 'success-snackbar');
          this.router.navigate(['/trailer-type']);
        }

        else () => {
          // Handle the error response here, if needed
          console.error('Error updating trailer type.');
          this.showSnackbar(`Trailer type could not be updated`, 'error-snackbar');
          this.errorMessage = 'Error updating trailer type. Please  check your connection and try again.';
        }
      })
  }
  /*,
  private snackBar:MatSnackBar
  */
  getErrorMessage(controlName: string) {
    const control = this.trailerTypeForm.get(controlName);

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

  showSnackbar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: [panelClass],
    });
  };

}