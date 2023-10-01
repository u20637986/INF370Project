import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/rentalDataService';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
  rentalForm! :FormGroup;
  fileFormatErrors: { [key: string]: string } = {};
  dateErrors: { [key: string]: string } = {};
  fileUploaded: boolean = false;



  constructor(private dataService: DataService, private route:ActivatedRoute, private snackBar:MatSnackBar, private fb:FormBuilder, private router:Router) {
    this.rentalForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      file1: [null, [Validators.required]],
      file2: [null, [Validators.required]],
      file3: [null, [Validators.required]]
    });
  }


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

  
  minDate(): string {
    const today = new Date();
   
    today.setDate(today.getDate() + 2);

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  }
  minReturnDate(): string {
    if (this.startDate) {
      const startDateAsDate = new Date(this.startDate);
  
     
      if (!isNaN(startDateAsDate.getTime())) {
        const collectionDate = new Date(startDateAsDate);
        collectionDate.setDate(collectionDate.getDate() +1);
        return collectionDate.toISOString().slice(0, 10);
      }
    }
  
    return '';
  }
  


  /*minReturnDate(): string {
    const collectionDate = new Date(this.startDate);
    collectionDate.setDate(collectionDate.getDate() + 1);
    return collectionDate.toISOString().slice(0, 10);
  }*/


  onFileSelected(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
        const selectedFile = fileInput.files[fileInput.files.length - 1];
        const maxSizeInBytes = 150 * 1024; 

        if (selectedFile.size <= maxSizeInBytes) {
            this.files.push(selectedFile);

            if (this.files.length === 3) {
                this.fileUploaded = true;
               
            }
        } else {
            alert('File size exceeds the allowed limit (150KB). Please choose a smaller file.');
            fileInput.value = '';
        }
    } else {
        this.fileUploaded = false;
        
    }
}


  async createRentalApplication(): Promise<void> {
    if (!this.startDate || !this.endDate || this.files.length === 0 || !this.selectedVehicleID) {

      return;
    }

    try {
      this.isSubmitting = true;
       const userId = localStorage.getItem('userID');

    if (!userId) {
      console.error('User ID not found in local storage. Please ensure the user is logged in.');
      return;
    }
      const formData = new FormData();
      formData.append('StartDate', this.startDate);
      formData.append('EndDate', this.endDate);
      formData.append('VehicleID', this.selectedVehicleID.toString());
      formData.append('UserID', userId)

      for (let i = 0; i < this.files.length; i++) {
        formData.append('Files', this.files[i], this.files[i].name);
      }
   
      await this.dataService.CreateVehicleRentalApplication(formData).toPromise();
      this.showSnackbar(`Please note that your rental application has been successfully submitted!! You will receive feedback after the application has been reviewed`, 'success-snackbar');
      this.router.navigate(['/rental-applications']); 
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        console.error('Error creating rental application:', error);
        let errorMessage = 'An error occurred while submitting your application.';
    
        if (error.status === 400 && error.error) {
          errorMessage = error.error;
        }
    
        this.snackBar.open(` ${errorMessage}`, 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
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
  goBack() {
    this.router.navigateByUrl('/');
  } 

}
