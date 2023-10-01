import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/rentalDataService';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-vehicle-rental-application',
  templateUrl: './create-vehicle-rental-application.component.html',
  styleUrls: ['./create-vehicle-rental-application.component.scss']
})
export class CreateVehicleRentalApplicationComponent implements OnInit{
  isLinear = false;
  startDate!: string;
  endDate!: string;
  files: File[] = [];
  selectedVehicleID!: number;
  selectedVehicleName!: string;
  selectedVehicleRegistrationNumber!: string;
  isSubmitting = false;
  selectedVehicleRentalPrice!: number 
  selectedVehicleType!:string;
  totalPrice!:number



  constructor(private dataService: DataService, private route:ActivatedRoute, private snackBar:MatSnackBar) {}

  ngOnInit() {
    // Get the route parameters to access the selected vehicle's details
    this.route.params.subscribe(params => {
      this.selectedVehicleID = +params['vehicleID'];
      this.selectedVehicleName = params['vehicleName'];
      this.selectedVehicleRegistrationNumber = params['registrationNumber'];
      this.selectedVehicleRentalPrice = params['vehiclePriceID'];
      this.selectedVehicleType = params['vehicleType'];

    });
  }

  onFileSelected(event: any): void {
    const selectedFiles: File[] = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.push(selectedFiles[i]);
    }
  }


  async createRentalApplication(): Promise<void> {
    if (!this.startDate || !this.endDate || this.files.length === 0 || !this.selectedVehicleID) {

      return;
    }

    try {
      this.isSubmitting = true;


      //code below is for capturing the form Data information
      const formData = new FormData();
      formData.append('StartDate', this.startDate);
      formData.append('EndDate', this.endDate);
      formData.append('VehicleID', this.selectedVehicleID.toString());

      for (let i = 0; i < this.files.length; i++) {
        formData.append('Files', this.files[i], this.files[i].name);
      }

      await this.dataService.CreateVehicleRentalApplication(formData).toPromise();
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


