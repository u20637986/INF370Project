// import { Component, OnInit,Inject } from '@angular/core';
// import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';

// import { Router } from '@angular/router';
// import { DataService } from 'src/app/service/passengerDataService';
// import { Passenger } from 'src/app/shared/passenger';
// import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog'
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { NotificationComponent } from './notification/notification.component';



// @Component({
//   selector: 'app-add-passengers',
//   templateUrl: './add-passengers.component.html',
//   styleUrls: ['./add-passengers.component.scss']
// })
// export class AddPassengersComponent implements OnInit{
//   //formData = new FormData();
//   AddPassengerForm: FormGroup;

//   /*addPassenger:Passenger ={
//     passengerID:0,
//     name:'',
//     surname:'',
//     cellphoneNo:'',
//   }*/
//   /*AddPassengerForm:FormGroup = this.FormBuilder.group(
//     {
//         name:['', Validators.required],
//         surname :['',Validators.required],
//         cellphoneNo:['', Validators.required, Validators.pattern(/0\d{9}$/)],
//     })*/
//   constructor(private dataService: DataService, private router: Router, public FormBuilder:FormBuilder, public dialog:MatDialog, private snackBar:MatSnackBar) {

//       this.AddPassengerForm = this.FormBuilder.group({
//         name: ['', Validators.required],
//         surname: ['', Validators.required],
//         phoneNumber: ['', [Validators.required, Validators.pattern(/0\d{9}$/)]],
//       });
//     }

//     openDialog() {
//       const dialogRef = this.dialog.open(NotificationComponent, {
//         width: '400px', // Set the width of the dialog (optional)
//       });
//       dialogRef.afterClosed().subscribe((result) => {
//         if (result === 'yes') {
//           // Action for "Yes" button here
//           console.log('Yes clicked');
//         } else if (result === 'no') {
//           // Action for "No" button here
//           console.log('No clicked');
//         } else {
//           // Dialog closed without clicking any action (optional)
//           console.log('Dialog closed');
//         }
//       });
//     }
//     ngOnInit(): void {
//     }

//     cancel(){
//       this.router.navigate(['/passengers'])
//     }

//     AddPassenger() {
//       if (this.AddPassengerForm.valid) {

//         const passenger = {
//           name: this.AddPassengerForm.value.name,
//           surname: this.AddPassengerForm.value.surname,
//           phoneNumber: this.AddPassengerForm.value.phoneNumber,
//         };

//         this.dataService.AddPassenger(passenger).subscribe(() => {
//           //this.router.navigate(['/passengers']);
//           this.openDialog();
//         });
//       }
//     }
//   }
