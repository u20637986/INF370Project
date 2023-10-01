import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/shared/passenger';
import { DataService } from 'src/app/service/passengerDataService';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
//import { ConfirmUpdateNotificationComponent } from './confirm-update-notification/confirm-update-notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-passengers',
  templateUrl: './update-passengers.component.html',
  styleUrls: ['./update-passengers.component.scss']
})
export class UpdatePassengersComponent implements OnInit {

  UpdatePassengerForm: FormGroup;
  passenger!: Passenger;


   constructor (private dataservice:DataService, private route:ActivatedRoute, private router:Router, private FormBuilder:FormBuilder, private snackBar:MatSnackBar) {
   this.UpdatePassengerForm = this.FormBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/0\d{9}$/)]],
    });
   }

   ngOnInit(): void {
    const passengerID = Number(this.route.snapshot.paramMap.get('id'));
    this.getPassenger(passengerID);

  }
  getPassenger(passengerID: number) {
    this.dataservice.getPassenger(passengerID).subscribe(result => {
      this.passenger = result;
      this.UpdatePassengerForm.patchValue({
        name: this.passenger.name,
        surname: this.passenger.surname,
        phoneNumber: this.passenger.phoneNumber
      });
    });
  }

 UpdatePassenger(){
    const updatedPassenger: Passenger = {
      passengerID: this.passenger.passengerID,
      name: this.UpdatePassengerForm.value.name,
      surname: this.UpdatePassengerForm.value.surname,
      phoneNumber: this.UpdatePassengerForm.value.phoneNumber,
      userID: 0
    };

    this.dataservice.UpdatePassenger(updatedPassenger, updatedPassenger.passengerID).subscribe(() => {
      this.showSnackbar('Passenger updated successfully', 'success-snackbar');
      this.router.navigate(['/passengers']);

    },
    (error) => {
      this.showSnackbar('An error occurred while updating passenger, Try again!!', 'error-snackbar'); // Show error snackbar on HTTP error
      console.error(error); // Log the error to the console for debugging purposes
    }
    );
   // this.openDialog(this.passenger);
  }
  showSnackbar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000, // Adjust the duration as per your requirement
      panelClass: [panelClass],
    });
  }



}

