import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/trailer.service';
import { FormControl, FormGroup } from '@angular/forms';

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
		size: new FormControl(''),
		registrationNumber: new FormControl(''),
		floorBase: new FormControl(''),
		panels: new FormControl(''),
		trailerRentalPrice: new FormControl(""),
		imageUrl: new FormControl(''),
		trailerTypeID: new FormControl(0),
		trailerStatusID: new FormControl(0)
	})

	trailer: any;
	trailerId!: number;

	constructor(
		private dataService: DataService,
		private router: Router,
		private route: ActivatedRoute
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

		this.dataService.updateTrailer(this.trailerId, trailer)
			.subscribe((result: any) => {
				if (result) {
					this.errorMessage = "Trailer has been updated";
					this.router.navigate(['/trailer']);
				}
			})

		// setTimeout(() => {

		//   this.errorMessage = "";
		// }, 5000)
	}


}

