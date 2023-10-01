import { DataService } from '../service/passengerDataService';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Passenger } from '../shared/passenger';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort , Sort} from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
   passengers: Passenger[] =[];
   displayedColumns: string[]=['name','surname','phoneNumber','update','delete'];
  passengerDataSource = new MatTableDataSource(this.passengers);

   constructor(private dataService:DataService,private router : Router, private snackBar:MatSnackBar){}

    ngOnInit(): void {
      this.GetPassengers();
      console.log(this.passengers);
    }


    /*GetPassengers()
  {
    this.dataService.GetAllPassengers().subscribe(result => {
      let passengerList:any[] = result
      passengerList.forEach((element) => {
        this.passengers.push(element)
      });
    })
  }*/
  GetPassengers() {
    this.dataService.GetAllPassengers().subscribe((result) => {
      let passengerList: any[] = result;
      passengerList.forEach((element) => {
        this.passengers.push(element);
      });
      this.passengerDataSource.data = this.passengers; // Update the dataSource here
    });
  }


    /*applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.passengerDataSource.filter = filterValue.trim().toLowerCase();
    }*/

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.passengerDataSource.filter = filterValue.trim().toLowerCase();

      // Check if there are any filtered items after applying the filter
      const filteredData = this.passengerDataSource.filteredData;
      if (filteredData.length === 0) {
        this.showNotFoundSnackbar();
      } else {
        // If there were matches previously, close the snackbar (if it was shown before)
        this.snackBar.dismiss();
      }
    }

    showNotFoundSnackbar() {
      // Show a snackbar with the "Not found" message
      this.snackBar.open('Passenger Not found', 'Dismiss', {
        duration: 3000, // Adjust the duration as per your requirement
        panelClass: 'not-found-snackbar', // You can style the snackbar using this class
      });
    }




  /*RemovePassenger(passengerID: Number){
    this.dataService.DeletePassenger(passengerID).subscribe((result:any) => {
      if(result.statusMessage == "success" || result.statusCode == 200)
      {
        this.GetPassengers();

      }
      location.reload();


    });
    }*/
    RemovePassenger(passengerID: number) {
      this.dataService.DeletePassenger(passengerID).subscribe(
        (result: any) => {
          if (result.statusMessage === "success" || result.statusCode === 200) {
            this.GetPassengers();
            // Show success snackbar
          }

          location.reload();
          this.showSnackbar('Passenger deleted successfully', 'success-snackbar');
        },
        (error) => {
          this.showSnackbar('An error occurred while deleting passenger, Try again!!', 'error-snackbar'); // Show error snackbar on HTTP error
          console.error(error); // Log the error to the console for debugging purposes
        }
      );
    }

    showSnackbar(message: string, panelClass: string) {
      this.snackBar.open(message, 'Close', {
        duration: 6000,
        panelClass: [panelClass],
      });
    }



}


