import { Component, OnInit } from '@angular/core';
import { RentalBase } from 'src/app/shared/rentalBase';
import { DataService } from 'src/app/service/rentalDataService';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-owner-side',
  templateUrl: './view-owner-side.component.html',
  styleUrls: ['./view-owner-side.component.scss']
})
export class ViewOwnerSideComponent implements OnInit {
  
 rentalId!: number;
 startDate!: string;
 endDate!: string;
 trailerId!: number;
 totalPrice!: number;
 rentalStatusID!: number;
 files: any[] = [];
 rentals: RentalBase[] = [];
 //rental:RentalBase = new RentalBase;
 status: any[]=[];
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
    
        // Check if 'Details' property exists in the response
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

 Review(rentalId: number){
   this.router.navigate(['/review', rentalId])
 }
 sendDetails(rentalId: number) {
  this.dataService.sendCollectionDetails(rentalId).subscribe(
    (response) => {
      
     
      this.showSnackbar(`Collection details successfully sent to client`, 'success-snackbar');
      this.router.navigateByUrl('/');
    },
    (error) => {
      this.showSnackbar(`Collection details successfully sent to client`, 'success-snackbar');
      this.router.navigateByUrl('/');
    }
  );
}
goBack() {
  this.router.navigateByUrl('/');
} 
showSnackbar(message: string, panelClass: string) {
  this.snackBar.open(message, 'Close', {
    duration: 6000,
    panelClass: [panelClass],
  });
};
}