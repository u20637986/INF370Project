import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core'
import { DataService } from 'src/app/service/rentalDataService';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { AvailabilityCalendarComponent } from './availability-calendar/availability-calendar.component';

//import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-rental-application',
  templateUrl: './rental-application.component.html',
  styleUrls: ['./rental-application.component.scss']
})


export class RentalApplicationComponent implements OnInit{
  @ViewChild('stepper') stepper!: MatStepper 
  @ViewChild(AvailabilityCalendarComponent) availabilityCalendar!: AvailabilityCalendarComponent;
 // isLinear = false;
  startDate!: string;
  endDate!: string;
  files: File[] = [];
  selectedTrailerID!: number;
  selectedTrailerSize!: string;
  selectedTrailerRegistrationNumber!: string;
  isSubmitting = false;
  selectedTrailerRentalPrice!: number 
  selectedTrailerType!:string;
  totalPrice!:number
  rentalForm! :FormGroup;
  fileUploaded: boolean = false;
  isOverlap!: boolean;
  //isOverlap: boolean = false;

  



  constructor(private dataService: DataService, private route:ActivatedRoute, private snackBar:MatSnackBar, private fb:FormBuilder, private router:Router) {
    this.rentalForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      file1: [null, [Validators.required]],
      file2: [null, [Validators.required]],
      file3: [null, [Validators.required]]
    });
    //this.isOverlap = false;
  }
 
  ngOnInit() {
    // Get the route parameters to access the selected vehicle's details
    this.route.params.subscribe(params => {
      this.selectedTrailerID = +params['trailerID'];
      this.selectedTrailerSize = params['size'];
      this.selectedTrailerRegistrationNumber = params['registrationNumber'];
      this.selectedTrailerRentalPrice = params['rentalPrice'];
      this.selectedTrailerType = params['trailerType'];

    });
    //this.checkRentalOverlap();
  }

  goBack(): void {
    this.router.navigate(['/']); 
  }
  
  minDate(): string {
    const today = new Date();
   
    today.setDate(today.getDate() + 2);

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  }

 /* minReturnDate(): string {
  
    const collectionDate = new Date(this.startDate);
    collectionDate.setDate(collectionDate.getDate() + 1);

    return collectionDate.toISOString().slice(0, 10);
  }
*/
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
    if (!this.startDate || !this.endDate || this.files.length === 0 || !this.selectedTrailerID) {

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
      formData.append('TrailerID', this.selectedTrailerID.toString());
      formData.append('UserID', userId)

      for (let i = 0; i < this.files.length; i++) {
        formData.append('Files', this.files[i], this.files[i].name);
      }
   
      await this.dataService.CreateRentalApplication(formData).toPromise();
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

  async checkRentalOverlap() {
    const trailerId = this.selectedTrailerID;
    const result = await this.dataService.checkTrailerRentalOverlap(
      trailerId,
      this.startDate,
      this.endDate
    ).toPromise();
  
    // Use a type assertion to specify the expected type
    const response = result as unknown as { isOverlap: boolean };
  
    if (response !== undefined) {
      this.isOverlap = response.isOverlap;
      console.log('Is overlap:', this.isOverlap); 
  
      if (this.isOverlap === true) {
        alert('The trailer is not available for the selected dates. Select new dates.');
        this.stepper.previous();
        this.startDate ='';
        this.endDate= '';
      } 
    }
  }
  
}