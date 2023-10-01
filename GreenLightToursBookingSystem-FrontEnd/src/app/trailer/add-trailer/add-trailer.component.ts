import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/trailer.service';
import { TrailerStatus } from 'src/app/shared/trailerstatus';
import { RentalPrices } from 'src/app/shared/rentalprice';
import { TrailerType } from 'src/app/shared/trailertype';


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
		private fb: FormBuilder) { }

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
			size: ['', Validators.required],
			registrationNumber: ['', Validators.required],
			floorBase: ['', Validators.required],
			panels: ['', Validators.required],
			trailerTypeID: ["", Validators.required],
			trailerStatusID: ["", Validators.required],
			trailerRentalPrice: ["", Validators.required],
		});
	}

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
			this.errorMessage = "Please provide all requird fields";
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

		this.dataService.addTrailer(trailer)
			.subscribe(
				() => {
					// Handle the success response here, if needed
					console.log('Trailer added successfully:');
					this.route.navigate(['/trailer']);
				},
				(error) => {
					// Handle the error response here, if needed
					console.error('Error adding trailer:', error);
				}
			)

	}

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
