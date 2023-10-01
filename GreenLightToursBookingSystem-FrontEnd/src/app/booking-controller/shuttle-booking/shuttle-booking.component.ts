import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Schedule } from 'src/app/shared/schedule';
import { TimeSlot } from 'src/app/shared/timeslot';
import { Location } from 'src/app/shared/location';
import { BookingType} from 'src/app/shared/bookingtype';
import { Passenger } from 'src/app/shared/passenger';
import { Booking } from 'src/app/shared/Bookings';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookingPrice } from 'src/app/shared/bookingPrice';

@Component({
  selector: 'app-shuttle-booking',
  templateUrl: './shuttle-booking.component.html',
  styleUrls: ['./shuttle-booking.component.scss']
})
export class ShuttleBookingComponent implements OnInit{

  timeSlots:TimeSlot[] = [];
  schedule: Schedule[] =[]
  Locations: Location[]=[];
  bookingtyps: BookingType[]=[];
  filteredTimeSlots: TimeSlot[]=[]
  filteredByDate: TimeSlot[]=[]
  Passengers: Passenger[]=[]
  Luggage = ['Normal','Abnormal']
  TripAmount:number = 0
  constructor(private dataService: DataService, private router: Router){}

  DepatureDate:string = "";
  LocationName:number= 0;
  DepartureTime:number= 0;
  BookingTypeName:number=0;
  name:string="";
  surname:string="";
  passengersnum:number = 1;
  luggageSize:string = ""

  ngOnInit():void{
    //this.GoBack();
    this.GetAllBookingTypes();
    this.GetAllLocations();
    this.GetTimeSlots();
    this.GetSchedule();
    this.Passengers.push({passengerID: 0, name: '', surname:'', phoneNumber: '', userID: 0})
  }
  GoBack(route: string): void {
    this.router.navigate([route]);
  }
  GetSchedule(){
    this.dataService.GetSchedule().subscribe(result => 
      {
        let tempSchedule:any[] = result
        tempSchedule.forEach((element) => {
        this.schedule.push(element)
        }) 
      } 
    )  
    //console.log("Schedule : " , this.schedule)
  } 

  GetTimeSlots(){
    this.dataService.GetAllTimeslots().subscribe(result => 
      {
        let timeSlotTemp:any[] = result

        timeSlotTemp.forEach((element) => {
        this.timeSlots.push(element)
        }) //foreach

      } //result

    ) //subscribe
    
  } //GetSchedule

  GetAllLocations(){
    this.dataService.GetAllLocations().subscribe( result =>
      {
        let locationsTemp:any[] = result

       locationsTemp.forEach((element) => {
         this.Locations.push(element)
       })
      }
    )
  }

  //filtering
  filterTimeSlots(event : any):void{
    this.filteredTimeSlots = []
    const value = event.target.value;
    this.timeSlots.forEach((element) => {
      if (element.locationID == value)
      {
        this.filteredTimeSlots.push(element)
      }
    });
    if (this.filteredTimeSlots.length == 0)
    {
      alert("There are no trips for this location in the schedule for now")
      this.filteredByDate = []
      this.filteredTimeSlots = []
    }
  }

  ///filtering
  filterByDate(event: any):void{
    this.filteredByDate = []
    const value = event.target.value
    this.filteredTimeSlots.forEach((element) => {
      if (element.departureDate == value)
      {
        this.filteredByDate.push(element)
      }
    })
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
  else
  alert("You must have at least 1 passenger or the passenger should be you.")
}

getBookingPrice():number{
  var bookingPriceID = 0
  this.Locations.forEach((element) =>{
    if ( element.locationID == this.LocationName){
       bookingPriceID = element.bookingPriceId
    }
  })

  this.dataService.GetBookingPrice(bookingPriceID).subscribe((result: any) =>{
    let temp:any = result    
    this.TripAmount = temp.amount    
    localStorage.setItem("Amount", temp.amount)
  })
  this.TripAmount = +localStorage.getItem("Amount")!
  return this.TripAmount;
}


SaveBookingDetails(){

  //Filter schedule first to find available seats
  
  var filteredSchedule:Schedule[]=[]
  this.schedule.forEach((element) =>{
    if ((element.locationID == this.LocationName) && (element.scheduleDate == this.DepatureDate) && (element.timeSlotID == this.DepartureTime)) {
      filteredSchedule.push(element)
    }
  })

  console.log(filteredSchedule)
  if (filteredSchedule[0].available_seats < this.passengersnum){
    alert("There are only " + filteredSchedule[0].available_seats + " available seats for this booking.")
  }
  // if enough seats are available
  else{

    var bookingObject:Booking = new Booking;

    bookingObject.bookingID = 0
    bookingObject.locationID = this.LocationName
    bookingObject.bookingStatusID = 0
    bookingObject.bookingTypeId = this.BookingTypeName
    bookingObject.date = new Date(Date.now())
    bookingObject.scheduleId = filteredSchedule[0].scheduleID
    bookingObject.serviceId = 1
    bookingObject.travelpackageId  = 0
    bookingObject.userID =   +localStorage.getItem("userID")!
    var bookingAmount = this.getBookingPrice()
    bookingObject.totalPrice = bookingAmount*this.passengersnum

    if (this.luggageSize == "Abnormal"){
      bookingObject.totalPrice += 75
    }

    localStorage.setItem("DepartureDate", this.DepatureDate)
    localStorage.setItem("Booking", JSON.stringify(bookingObject))
    localStorage.setItem("Passengers", JSON.stringify(this.Passengers))
    console.log(this.Passengers)

    this.router.navigate(['/make-payment'])
  }
}


}
