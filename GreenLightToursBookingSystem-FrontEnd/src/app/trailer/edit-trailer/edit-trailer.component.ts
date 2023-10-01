import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/trailer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-edit-trailer',
	templateUrl: './edit-trailer.component.html',
	styleUrls: ['./edit-trailer.component.scss']
})
export class EditTrailerComponent implements OnInit {
	trailerType: any;
	trailerStatus: any;
	trailerRentalPrice: any;
	imageUrl: string = "";
	errorMessage: string = "";

	trailerForm = new FormGroup({
		size: new FormControl('', [
			Validators.required,
			Validators.pattern(/^[A-Z0-9 ]+$/), // Letters and numbers
		]),
		registrationNumber: new FormControl('', [
			Validators.required,
			Validators.pattern(/^[A-Z0-9 ]+$/), // Letters and numbers
		]),
		floorBase: new FormControl('', [
			Validators.required,
			Validators.pattern(/^[A-Z0-9 ]+$/), // Letters and numbers
		]),
		panels: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/),]),//Numbers only
		trailerRentalPrice: new FormControl("", [Validators.required, Validators.pattern(/^[0-9 ]+$/),]),//Numbers only
		imageUrl: new FormControl(''),
		trailerTypeID: new FormControl(0),
		trailerStatusID: new FormControl(0)
	})

	trailer: any;
	trailerId!: number;

	constructor(
		private dataService: DataService,
		private router: Router,
		private route: ActivatedRoute,
		private snackBar: MatSnackBar
	) { }

	async ngOnInit(): Promise<void> {

		this.trailerId = +this.route.snapshot.params['trailerID'];

		console.log('Trailer ID:', this.trailerId);

		this.dataService.getTrailer(this.trailerId).subscribe((result: any) => {
			this.trailer = result;
			this.imageUrl = this.trailer.base64Data;

			this.trailerForm.patchValue({
				size: this.trailer.size,
				registrationNumber: this.trailer.registrationNumber,
				imageUrl: this.trailer.imageFile,
				floorBase: this.trailer.floorBase,
				panels: this.trailer.panels,
				trailerTypeID: this.trailer.trailerTypeID,
				trailerStatusID: this.trailer.trailerStatusID,
				trailerRentalPrice: this.trailer.trailerRentalPrice
			})
		})

		this.dataService.getTrailerStatuses().subscribe((result: any) => {
			this.trailerStatus = result;
		})


		this.dataService.getTrailerTypes().subscribe((result: any) => {
			this.trailerType = result;
		})

	}

	selectFile(event: any) {
		if (event.target.files) {
			for (const file of event.target.files) {
				const reader = new FileReader();
				reader.readAsDataURL(file);

				reader.onload = (event: any) => {
					this.imageUrl = event.target.result;
				}
			}
		}
	}

	cancel() {
		this.router.navigate(['/trailer'])
	}

	onSubmit() {

		if (this.trailerForm.invalid) {
			this.errorMessage = "Please provide all required fields";
			return;
		}
		if (this.imageUrl == '') {
			this.errorMessage = "Please add a trailer image";
			return;
		}

		this.errorMessage = '';

		const trailer: {
			size: string,
			registrationNumber: string,
			trailerTypeID: number,
			panels: string,
			floorBase: string,
			trailerStatusID: number,
			trailerRentalPrice: string,
			imageFile: string
		} = {
			size: this.trailerForm.value.size!,
			registrationNumber: this.trailerForm.value.registrationNumber!,
			trailerTypeID: Number(this.trailerForm.value.trailerTypeID!),
			panels: this.trailerForm.value.panels!,
			floorBase: this.trailerForm.value.floorBase!,
			trailerStatusID: this.trailerForm.value.trailerStatusID!,
			trailerRentalPrice: String(this.trailerForm.value.trailerRentalPrice!),
			imageFile: this.imageUrl!
		};

		this.dataService.updateTrailer(this.trailerId, trailer)
			.subscribe((result: any) => {
				if (result) {
					this.errorMessage = "Trailer has been updated";
					this.showSnackbar(`Trailer updated successfully`, 'success-snackbar');
					this.router.navigate(['/trailer']);
				}

				else () => {
					// Handle the error response here, if needed
					console.error('Error updating trailer.');
					this.showSnackbar(`Trailer could not be updated`, 'error-snackbar');
					this.errorMessage = 'Error updating trailer. Please  check your connection and try again.';
				}
			})
	}

	getErrorMessage(controlName: string) {
		const control = this.trailerForm.get(controlName);
	
		if (!control) {
		  return ''; // Return an empty string if the control is not found
		}
	
		if (control.hasError('required')) {
		  return 'This field is required';
		}
	
		if (controlName === 'size') {
		  if (control.hasError('pattern') || control.hasError('required')) {
			return 'Enter a valid size (e.g., 900KG)';
		  }
		  // Add additional error checks for price if needed
		}
  
		if (controlName === 'registrationNumber') {
		  if (control.hasError('pattern') || control.hasError('required')) {
			return 'Enter a valid registration number (e.g., DH 73 MS GP or HGB 736 GP)';
		  }
		  // Add additional error checks for price if needed
		}

		if (controlName === 'floorBase') {
			if (control.hasError('pattern') || control.hasError('required')) {
			  return 'Enter a valid floor base (e.g., 90X90 or 70 X 80)';
			}
			// Add additional error checks for price if needed
		  }

		  if (controlName === 'panels') {
			if (control.hasError('pattern') || control.hasError('required')) {
			  return 'Enter panel number (e.g., 4)';
			}
			// Add additional error checks for price if needed
		  }

		  if (controlName === 'trailerRentalPrice') {
			if (control.hasError('pattern') || control.hasError('required')) {
			  return 'Enter a valid trailer rental price. (e.g., 400)';
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

