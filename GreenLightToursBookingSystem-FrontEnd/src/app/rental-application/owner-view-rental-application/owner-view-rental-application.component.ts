import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/rentalDataService';
import { Rental } from 'src/app/shared/rental';
import { Rental_Status } from 'src/app/service/rentalStatus';
import { User } from 'src/app/shared/user';
import { Observable, forkJoin, map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-owner-view-rental-application',
  templateUrl: './owner-view-rental-application.component.html',
  styleUrls: ['./owner-view-rental-application.component.scss']
})
export class OwnerViewRentalApplicationComponent implements OnInit {
  
  rentalApplication: Rental[] = [];
  rentalID!: number;
  searchInput: string = ''; 

  constructor(private dataService : DataService, private router:Router) {}
  ngOnInit(): void {
    this.GetRentalApplications()
    console.log(this.rentalApplication)
    
  }

  GetRentalApplications() {
    this.dataService.GetAllRentalApplications().subscribe((result: Rental[]) => {
      const rentalList: Rental[] = result;
      this.rentalApplication = []; 
  
      const observables: Observable<any>[] = [];
  
      rentalList.forEach((element) => {
        observables.push(
          forkJoin([
            this.dataService.GetUsers().pipe(
              map((userDetails: User[]) =>
                userDetails.find((user) => user.userId === element.userId)
              )
            ),
            this.dataService.GetRentalStatuses().pipe(
              map((rentalStatus: Rental_Status[]) =>
                rentalStatus.find((stat) => stat.rentalStatusID === element.rentalStatusID)
              )
            ),
          ]).pipe(
            map(([user, status]) => {
              const rentalApplication: Rental = { ...element };
  
              if (user) {
                rentalApplication.userName = user.name;
                rentalApplication.userSurname = user.surname;
              }
  
              if (status) {
                rentalApplication.rentalStatus = status.name;
              }
  
              return rentalApplication;
            })
          )
        );
      });
  
      forkJoin(observables).subscribe((rentalApplications: Rental[]) => {
        this.rentalApplication = rentalApplications;
        console.log(this.rentalApplication);
      });
    });
  }
  onSearchInputChange() {
    // Filter the rentalApplication array based on the entered value
    const filteredRentals = this.rentalApplication.filter(rental => {
      const fullName = rental.userName + ' ' + rental.userSurname;
      const rentalStatusMatch = rental.rentalStatus.toLowerCase().includes(this.searchInput.toLowerCase());
      const rentalIDMatch = rental.rentalID.toString().includes(this.searchInput);

      // Check if any of the conditions match
      return fullName.toLowerCase().includes(this.searchInput.toLowerCase()) ||
             rentalStatusMatch ||
             rentalIDMatch;
    });

    // Update the rentalApplication with the filtered array
    this.rentalApplication = filteredRentals;
  }

  clearSearch() {
    this.searchInput = ''; // Clear the search input
    this.GetRentalApplications(); // Reset to display all records
  }
  
  goBack() {
    this.router.navigateByUrl('/');
  } 
}