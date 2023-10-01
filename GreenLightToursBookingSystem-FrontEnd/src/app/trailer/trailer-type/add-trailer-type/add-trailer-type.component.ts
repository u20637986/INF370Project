
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/trailer.service';
import { licenseCode } from 'src/app/shared/licenseCode';
import { TrailerType } from 'src/app/shared/trailertype';

@Component({
  selector: 'app-add-trailer-type',
  templateUrl: './add-trailer-type.component.html',
  styleUrls: ['./add-trailer-type.component.scss']
})
export class AddTrailerTypeComponent {

  trailerTypeForm!:FormGroup;

  name!: string;
  description!: string;
  trailerTypes: TrailerType[]=[];

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
      this.trailerTypeForm = this.fb.group({
        name: ['',[Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]*$/)]], // Letters and numbers],
        description: ['', Validators.required, Validators.pattern(/^[A-Za-z0-9 .]+$/)], // Letters and numbers],
      });
    }

    onSubmit(): void {

      if (this.trailerTypeForm.invalid) {
        this.errorMessage = "Please provide all required fields";
        return;
      }
      this.errorMessage = '';
  
      const trailerType: {
        name: string,
        description: string,
      } =
      {
        name: this.trailerTypeForm.value.name,
        description: this.trailerTypeForm.value.description
      };
  
      this.dataService.addTrailerType(trailerType)
        .subscribe(() => {
          console.log('Trailer type added successfully:');
          this.showSnackbar(`Trailer type added successfully`, 'success-snackbar');
          this.route.navigate(['/trailer-type']);
        },
          (error) => {
            // Handle the error response here, if needed
            console.error('Error adding trailer type:', error);
            this.showSnackbar(`Trailer type could not be added`, 'error-snackbar');
            this.errorMessage = 'Error adding trailer type: ' + error;
          })
    }
    showSnackbar(message: string, panelClass: string) {
      this.snackBar.open(message, 'Close', {
        duration: 6000,
        panelClass: [panelClass],
      });
    };

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
  /*,
  private snackBar:MatSnackBar
  */
    cancel() {
  
      this.trailerTypeForm.reset();
      this.route.navigate(['/trailer-type']);
  
    }
  
  }