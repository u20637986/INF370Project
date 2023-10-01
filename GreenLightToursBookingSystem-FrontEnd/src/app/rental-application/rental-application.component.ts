import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/rentalDataService';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { DataService } from '../services/rentalDataService';

@Component({
  selector: 'app-rental-application',
  templateUrl: './rental-application.component.html',
  styleUrls: ['./rental-application.component.scss']
})
export class RentalApplicationComponent implements OnInit {
  isLinear = false;
  startDate!: string;
  endDate!: string;
  files: File[] = [];
  selectedTrailerID!: number;
  selectedTrailerSize!: string;
  selectedTrailerRegistrationNumber!: string;
  isSubmitting = false;
  selectedTrailerRentalPrice!: number // Replace with the actual rental price for the selected trailer
  totalPrice!:number



  constructor(private dataService: DataService, private route:ActivatedRoute, private snackBar:MatSnackBar) {}

  ngOnInit() {
    // Get the route parameters to access the selected trailer's details
    this.route.params.subscribe(params => {
      this.selectedTrailerID = +params['trailerID'];
      this.selectedTrailerSize = params['size'];
      this.selectedTrailerRegistrationNumber = params['registrationNumber'];
      this.selectedTrailerRentalPrice = params['rentalPrice'];

    });
  }

  onFileSelected(event: any): void {
    const selectedFiles: File[] = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.push(selectedFiles[i]);
    }
  }


  async createRentalApplication(): Promise<void> {
    if (!this.startDate || !this.endDate || this.files.length === 0 || !this.selectedTrailerID) {

      return;
    }

    try {
      this.isSubmitting = true;


      //code below is for capturing the form Data information
      const formData = new FormData();
      formData.append('StartDate', this.startDate);
      formData.append('EndDate', this.endDate);
      formData.append('TrailerID', this.selectedTrailerID.toString());

      for (let i = 0; i < this.files.length; i++) {
        formData.append('Files', this.files[i], this.files[i].name);
      }

      await this.dataService.CreateRentalApplication(formData).toPromise();
      this.showSnackbar(`Please note that your rental application has been successfully submitted!! You will receive feedback after the application has been reviewed`, 'success-snackbar');
    } catch (error) {
      console.error('Error creating rental application:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  showSnackbar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: [panelClass],
    });
  };

}
















