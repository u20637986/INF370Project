import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/shared/rental';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/service/rentalDataService';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rental_Status } from 'src/app/service/rentalStatus';

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
    console.log(this.rentalApplication)
    //console.log(this.rental)
  }

  // code below is for fetching all existing rental applications
 /* GetRentalApplications() {
    this.dataService.GetAllRentalApplications().subscribe(result => {
        let rentalList: any[] = result;
        rentalList.forEach((element)=>{
          let rentalApplication:Rental = element
          
          this.dataService.GetRentalStatuses().subscribe(rentalStatus =>{
            let status:Rental_Status[]= rentalStatus
            let stat= status.find(stat => stat.ID === rentalApplication.rentalStatusID)
            if (stat){
              rentalApplication.rentalStatus = stat.Name
            }
          })
 
          })
        })
    
      }*/

      GetRentalApplications() {
       
        this.dataService.GetAllRentalApplications().subscribe(result => {
          let rentalList: any[] = result;
          rentalList.forEach((element) => {
            let rentalApplication: Rental = element;
            this.dataService.GetRentalStatuses().subscribe(rentalStatus => {
              let status: Rental_Status[] = rentalStatus;
              let stat = status.find(stat => stat.rentalStatusID === rentalApplication.rentalStatusID);
      
              if (stat) {
              
                rentalApplication.rentalStatus = stat.name;
                console.log('Rental Application:', rentalApplication);
                this.rentalApplication.push(rentalApplication)
              }
            });
          });
        });
      }

    }