import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/shared/rental';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/service/rentalDataService';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rental_Status } from 'src/app/service/rentalStatus';
import { forkJoin, map } from 'rxjs';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-client-view-rental-application',
  templateUrl: './client-view-rental-application.component.html',
  styleUrls: ['./client-view-rental-application.component.scss']
})
export class ClientViewRentalApplicationComponent implements OnInit {
  rentalApplication: Rental[] = [];
  
  rentalID!: number;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute, private snackBar:MatSnackBar, private router:Router
  ) {}

  ngOnInit(): void {
   this.GetRentalApplications();

  }


      GetRentalApplications() {
        this.dataService.GetUsersRentalApplications().subscribe(
          (result: any) => {
            if (Array.isArray(result)) {
              
              this.rentalApplication = result;
            } else if (result instanceof Object) {
              
              this.rentalApplication = [result];
            } 
       
            this.GetStatusesForApplications();
          },
          error => {
            console.error('Error getting rental applications:', error);
          }
        );
      }
      
      GetStatusesForApplications() {
        this.dataService.GetRentalStatuses().subscribe(
          (statuses: any[]) => {
            if (statuses && statuses.length > 0) {
              this.rentalApplication.forEach(application => {
                const status = statuses.find(stat => stat.rentalStatusID === application.rentalStatusID);
                if (status) {
                  application.rentalStatus = status.name;
                }
              });
            }
          },
          error => {
            console.error('Error getting rental statuses:', error);
          }
        );
      }
 
      goBack() {
        this.router.navigateByUrl('/');
      }
    }