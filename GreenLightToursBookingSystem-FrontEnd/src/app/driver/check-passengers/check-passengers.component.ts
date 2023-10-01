/*import { Component } from '@angular/core';

@Component({
  selector: 'app-check-passengers',
  templateUrl: './check-passengers.component.html',
  styleUrls: ['./check-passengers.component.scss']
})
export class CheckPassengersComponent {

}*/
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Passenger } from 'src/app/shared/passenger';
import { DataService } from 'src/app/service/passengerDataService';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-passengers',
  templateUrl: './check-passengers.component.html',
  styleUrls: ['./check-passengers.component.scss']
})
export class CheckPassengersComponent {

  passengers:Passenger[]=[];
  checkInButtonDisabled: boolean = false;
  displayedColumns:string[]=['Name','Surname','Phone Number',' '];
  dataSource=new MatTableDataSource<Passenger>();
  


  constructor(private dataService: DataService, private router: Router){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
   
    this.dataService.GetAllPassengers().subscribe((passenger:any)=>{this.dataSource.data=passenger});
      this.getPassengers()
      console.log(this.passengers)
    
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getPassengers(){
      this.dataService.GetAllPassengers().subscribe(result=>{
        let passengerList: any[]=result
        passengerList.forEach((element)=>{
          this.passengers.push(element)
        });
      })
    }

    updatePassengerStatus(passenger: Passenger, action: 'Check-In' | 'Check-Out'): void {
      if (action === 'Check-In') {
        passenger.passengerStatus = 'Checked-In';
        passenger.passengerStatusID = 1;
      } else if (action === 'Check-Out') {
        passenger.passengerStatus = 'Checked-Out';
        passenger.passengerStatusID = 2;
      }
  
      // Update the passenger's status using a service or API
      this.dataService.UpdatePassengerStatus(passenger, passenger.passengerID).subscribe(() => {
        // The status has been updated successfully
      });
    }
    
    isCheckInButtonDisabled(passenger: Passenger): boolean {
      return passenger.passengerStatus === 'Checked-In' || passenger.passengerStatusID === 2;
    }
  
    isCheckOutButtonDisabled(passenger: Passenger): boolean {
      return passenger.passengerStatus === 'Checked-Out' || passenger.passengerStatusID === 3;
    }
    
 
      isButtonDisabled(passenger: Passenger): boolean {
        return passenger.passengerStatus === 'Checked-Out' ||
               (passenger.passengerStatus === 'Checked-In' && this.checkInButtonDisabled);
      }
   

    
  
}
