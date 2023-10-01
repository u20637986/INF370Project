import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DataService } from 'src/app/service/rentalDataService';

@Component({
  selector: 'app-review-application',
  templateUrl: './review-application.component.html',
  styleUrls: ['./review-application.component.scss']
})
export class ReviewApplicationComponent implements OnInit {
  rentalId!: number; 

  selectedStatus!: boolean; 
  reason!: string ;
 
  constructor(private dataService: DataService, private route:ActivatedRoute, private snackBar:MatSnackBar, private router:Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const rentalIdParam = params.get('rentalId');
  
      if (rentalIdParam !== null) {
        const rentalId = +rentalIdParam;
        this.rentalId = rentalId;
      }
    });
  }
  

  reviewApplication() {
    if (this.rentalId !== undefined) {
      this.dataService.ReviewRentalApplication(this.rentalId, this.selectedStatus, this.reason)
        .subscribe(
          response => {
            console.log(response); 
            this.showSnackbar(`Rental Application successfully reviewed`, 'success-snackbar');
            this.router.navigate(['/owner-view'])
          },
          error => {
            console.error(error); 
            this.showSnackbar(`Rental Application successfully reviewed!!`, 'success-snackbar');
            this.router.navigate(['/owner-view'])
          }
        );
    } else {
      console.error("rentalID is undefined");
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
