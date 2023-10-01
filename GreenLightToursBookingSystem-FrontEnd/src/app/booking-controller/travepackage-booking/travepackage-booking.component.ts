import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { TravelPackage } from 'src/app/shared/travelPackage';
import { Passenger } from 'src/app/shared/passenger';
import { BookingType } from 'src/app/shared/bookingtype';
import { VMtravelPackage } from 'src/app/shared/VMtravelpackage';
import { Booking } from 'src/app/shared/Bookings';
import { Discount } from 'src/app/shared/discount';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { HelpParagraphService } from 'src/app/service/help-paragraph.service';

@Component({
  selector: 'app-travepackage-booking',
  templateUrl: './travepackage-booking.component.html',
  styleUrls: ['./travepackage-booking.component.scss']
})
export class TravepackageBookingComponent implements OnInit{
  constructor(private dataService: DataService, private router: Router, private snackBar:MatSnackBar, private helpService:HelpParagraphService){
    helpService.showBooking = false;
    helpService.showRental = false;
    helpService.showTravel = true;
  }
 
  TravelPackageBooking!: Booking
  AvailableTravelPack: TravelPackage[]=[];
  FilteredTravelPack: TravelPackage[]=[];
  isLinear = false;
  showPackDetailsDiv:boolean=false
  showBookingFields:boolean=false
  TravelPackage!: TravelPackage;
  bookingtyps: BookingType[]=[];
  BookingTypeName:number=0;
  TravelPackBooking:number=1;
  Passengers: Passenger[]=[]
  name:string="";
  surname:string="";
  passengersnum:number = 1;
  
  travelPackageStatusID!:number
  TravelPackLocation:number= 0;
 
  PackageForm: FormGroup = new FormGroup({
    BookingType: new FormControl('', [Validators.required]),
    PassengerName: new FormControl('',[Validators.required]),
    PassengerSurname: new FormControl('',[Validators.required]),
    PassengerNumber: new FormControl('',[Validators.required, Validators.pattern(/0\d{9}$/)])
  })

  

  ngOnInit(): void {
   
    localStorage.setItem("Page",JSON.stringify("Travel Booking"))
    this.GetAllTravelPackage();
    this.GetAllBookingTypes();
    
    
    this.Passengers.push({passengerID: 0, name: '', surname:'', phoneNumber: '', userID: 0})
  }

  
GetAllTravelPackage(){

  this.dataService.GetAllTravelPackage().subscribe(result => {
    let travelPack:any[] =result


    travelPack.forEach((element) => {
      element.imageBase64 = 'data:image/jpeg;base64,' + element.imageBase64
      this.AvailableTravelPack.push(element)
    })
  })
  console.log(this.AvailableTravelPack);
}


getTravelPack(Selected:any)
{
  this.TravelPackage = Selected;
  console.log(this.TravelPackage);
}


MakeVisible(event : any): void {
 
  this.showPackDetailsDiv = true
}

ShowBookingDiv(){
 
  this.showBookingFields = true
}

GetAllBookingTypes(){
  this.dataService.GetAllBookingTypes().subscribe( result =>
    {
      let BookingType:any[] = result

      BookingType.forEach((element) => {
       this.bookingtyps.push(element)
     })
    }
  )
}
//hide passenger controls
AddPassenger() {
this.Passengers.push({passengerID: 0, name: '', surname:'', phoneNumber: '', userID: 0})
this.passengersnum++
}

RemovePassenger(index: number){
if (this.Passengers.length > 1){
this.Passengers.splice(index, 1);
this.passengersnum--;
}
else {

  const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('You must have at least 1 passenger, which is yourself or the person you are making a booking for!', 'X', { duration: 1000000 , verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload() 
    });

}


//alert("You must have at least 1 passenger or the passenger should be you.")
}

// nextStep(stepper: MatStepper) {
//   // Delay of 2 seconds (2000 milliseconds)
//   setTimeout(() => {
//     stepper.next();
//   }, 2000);
// }

SaveTravelPackDetails(){

  if (this.PackageForm.valid)
  {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Your travel package booking progress has been saved', 'X', { duration: 1000000 , verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload() 
    });

  }
  // else {

  //   const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Please check that the booking type is selected and the passenger details fields are all entered ', 'X', { duration: 3000 , verticalPosition: 'top' });
  //   snackBarRef.afterDismissed().subscribe(() => {
  //     location.reload()
  //   });

  // }

 

  this.TravelPackageBooking =
  {
    bookingID: 0,
    locationID: this.TravelPackage.travelPackageID,
    bookingStatusID: 0,
    bookingTypeId :this.BookingTypeName,
    date: new Date(Date.now()),
    scheduleId: 0,
    serviceId: 2,
    travelpackageId: this.TravelPackage.travelPackageID,
    userID : +localStorage.getItem("userID")! ,
    totalPrice:this.TravelPackage.price!*this.passengersnum,
    //email: localStorage.getItem('email')!
  }

  //localStorage.setItem("DepartureDate", this.DepatureDate)
    localStorage.setItem("Travel_Booking", JSON.stringify(this.TravelPackageBooking))
    localStorage.setItem("TravelPackagePassengers", JSON.stringify(this.Passengers))



   
    // console.log(this.totalPassengers)
}





  
}
