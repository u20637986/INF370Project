import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/rentalDataService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RentalBase } from 'src/app/shared/rentalBase';

@Component({
  selector: 'app-view-rental-application',
  templateUrl: './view-rental-application.component.html',
  styleUrls: ['./view-rental-application.component.scss']
})
export class ViewRentalApplicationComponent {


 rentalId!: number;
  startDate!: string;
  endDate!: string;
  trailerId!: number;
  totalPrice!: number;
  //rentalStatus: string;
  files: any[] = [];
  rental:RentalBase = new RentalBase;
  status: any[]= [];
  rentalProduct: any = {}

  constructor(private route: ActivatedRoute, private dataService: DataService, private snackBar:MatSnackBar, private router:Router) {}


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.rentalId = +params['rentalId'];
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
      this.trailerId = +params['trailerId'];
      this.totalPrice = +params['totalPrice'];

      this.dataService.getRentalApplication(this.rentalId).subscribe(
        (data) => {
          if (data && data.RentalApplication) {
            this.rentalId = data.RentalApplication.RentalID;
            this.startDate = data.RentalApplication.StartDate;
            this.endDate = data.RentalApplication.EndDate;
            this.trailerId = data.RentalApplication.TrailerID;
            this.totalPrice = data.RentalApplication.TotalPrice;
          }
       
          if (data && data.Files && data.Files.$values && Array.isArray(data.Files.$values)) {
            this.files = data.Files.$values;
          } else {
            this.files = [];
          }
          
      
          if (data && data.Status && data.Status.$values && Array.isArray(data.Status.$values)) {
            this.status = data.Status.$values;
          } else {
            this.status = [];
          }
      
          localStorage.setItem('Rental', JSON.stringify(data));
      
          if (data && data.Details) {
            if (data.Details.VehicleDetails) {
              this.rentalProduct = {
                name: data.Details.VehicleDetails.VehicleName,
                type:data.Details.VehicleDetails.VehicleType.Name,
                registrationNumber: data.Details.VehicleDetails.RegistrationNumber,
              };
            } else if (data.Details.TrailerDetails) {
              this.rentalProduct = {
                name: data.Details.TrailerDetails.Size,
                type: data.Details.TrailerDetails.TrailerType.Name + "\n" + "trailer",
                registrationNumber: data.Details.TrailerDetails.RegistrationNumber,
              };
            }
          }
          console.log(data)
        },
        (error) => {
          console.error('Error fetching Rental Application:', error);

        }
      );
    });
 

  } 

  //code below is for cancelling the rental application.
  cancelRentalApplication(rentalID: number) {
    this.dataService.cancelRentalApplication(rentalID).subscribe(
      (result: any) => {
        this.showSnackbar(
          'Rental Application successfully cancelled, please contact the owner for a refund',
          'success-snackbar'
        );
        this.router.navigate(['/rental-applications']);
      },
      (error) => {
        this.showSnackbar(
          'An error occurred while cancelling the application, Try again!!',
          'error-snackbar'
        );
        console.error(error);
      }
    );
  }

  showSnackbar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: [panelClass],
    });
  }

  viewFile(fileData: string) {
    //  Code below is for creating a new Blob from the base64 encoded string, fileData
    const blob = new Blob([this.base64ToArrayBuffer(fileData)], { type: 'application/pdf' });
    const fileUrl = URL.createObjectURL(blob); 
    window.open(fileUrl, '_blank');   // this code is for opening  the file in a new tab
  }

  // code below is for converting the base64 encoded string
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  }
  goBack() {
    this.router.navigateByUrl('/');
  } 
}