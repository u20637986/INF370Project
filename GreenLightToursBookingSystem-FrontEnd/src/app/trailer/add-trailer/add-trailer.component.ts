import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/trailer.service';
import { TrailerStatus } from 'src/app/shared/trailerstatus';
import { RentalPrices } from 'src/app/shared/rentalprice';
import { TrailerType } from 'src/app/shared/trailertype';
import { Trailer } from 'src/app/shared/trailer';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
	selector: 'app-add-trailer',
	templateUrl: './add-trailer.component.html',
	styleUrls: ['./add-trailer.component.scss']
})

export class AddTrailerComponent implements OnInit {

	trailerForm!: FormGroup;
	registrationNumber!: string;
	trailerTypeID: any;
	trailerTypes: TrailerType[] = [];
	trailers: Trailer[]=[];
	trailerType: any;
	size!: number;
	floorBase!: string;
	panels!: string;
	trailerStatus: any;
	trailerRentalPrice: any;
	imageUrl: string = "";
	rentalPriceID: any;
	trailerStatusID: any;
	selectedImage: string | ArrayBuffer | null = null;
	trailerStatuses: TrailerStatus[] = [];
	rentalPrices: RentalPrices[] = [];
	errorMessage: string = "";


	constructor(
		private dataService: DataService,
		private route: Router,
		private fb: FormBuilder,
		private snackBar:MatSnackBar) { }

	ngOnInit(): void {
		this.getStatusesFromAPI();
		this.getTypesFromAPI();
		console.log(this.trailerStatuses)
		this.buildForm();

	}

	private getStatusesFromAPI() {
		this.dataService.getTrailerStatuses().subscribe((result: any) => {
			let response = result as TrailerStatus[];
			this.trailerStatuses = response;
		});
	}

	private getTypesFromAPI() {
		this.dataService.getTrailerTypes().subscribe((result: any) => {
			let response = result as TrailerType[];
			this.trailerTypes = response;
		})
	}

	private buildForm() {
		this.trailerForm = this.fb.group({
			size: ['', [Validators.required,Validators.pattern(/^[A-Z0-9 ]+$/)]], // Letters and numbers],
			registrationNumber: ['', [Validators.required,Validators.pattern(/^[A-Z0-9 ]+$/)]], // Letters and numbers],
			floorBase: ['', Validators.required],
			panels: ['',[ Validators.required, Validators.pattern(/^[0-9]+$/)]],//Numbers only
			trailerTypeID: ["", Validators.required],
			trailerStatusID: ["", Validators.required],
			trailerRentalPrice: ["", [Validators.required, Validators.pattern(/^[0-9 ]+$/)]],//Numbers only
		});
	}
//("^[0-9]*$", 
	GetTrailerStatuses() {
		this.dataService.getTrailerStatuses().subscribe(result => {
			let trailerStatusList: any[] = result;
			trailerStatusList.forEach((element) => {
				this.trailerStatus.push(element);
			});
			console.log(this.GetTrailerStatuses);
		});
	}

	GetTrailerTypes() {
		this.dataService.getTrailerTypes().subscribe(result => {
			let trailerTypeList: any[] = result;
			trailerTypeList.forEach((element) => {
				this.trailerType.push(element);
			})
			console.log(this.GetTrailerTypes);
		})
	}

	onSubmit(): void {

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

		const existingTrailer = this.trailers.find(
			(trailer) => trailer.registrationNumber === this.trailerForm.value.registrationNumber
		  );
		
		  console.log("Existing Trailers:", existingTrailer);
		  console.log("Registration Number to Check:", this.trailerForm.value.registrationNumber);
		
		
		  if (existingTrailer!=undefined) {
			this.errorMessage = "A trailer with this registration number already exists.";
			return;
		  }
		else{
		this.dataService.addTrailer(trailer)
			.subscribe(
				() => {
					// Handle the success response here, if needed
					console.log('Trailer added successfully:');
					this.showSnackbar(`Trailer added successfully`, 'success-snackbar');
					this.route.navigate(['/trailer']);
				},
				(error) => {
					// Handle the error response here, if needed
					console.error('Error adding trailer:', error);
					this.showSnackbar(`Trailer could not be added`, 'error-snackbar');
					this.errorMessage='Error adding trailer: '+ error;
				}
			)
		}

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
	  
	cancel() {
		this.trailerForm.reset();
		//this.selectedImage = null;
		//this.imageFile = null;
		this.route.navigate(['/trailer']);
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
}
