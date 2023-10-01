import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Schedule } from 'src/app/shared/schedule';
import { TimeSlot } from 'src/app/shared/timeslot';
import { Location } from 'src/app/shared/location';
import { BookingType} from 'src/app/shared/bookingtype';
import { Passenger } from 'src/app/shared/passenger';
import { Booking } from 'src/app/shared/Bookings';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { BookingPrice } from 'src/app/shared/bookingPrice';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import { Subject } from 'rxjs'; 
import { formatDate } from '@angular/common';
import { setMinutes, setHours } from 'date-fns';
import { colors} from 'src/app/shared/colors';
import Swal from 'sweetalert2';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';
import { SharedNavService } from 'src/app/service/shared-nav.service';
import { HelpParagraphService } from 'src/app/service/help-paragraph.service';

@Component({
  selector: 'app-shuttle-booking',
  templateUrl: './shuttle-booking.component.html',
  styleUrls: ['./shuttle-booking.component.scss']
})
export class ShuttleBookingComponent implements OnInit{
  timeslot!:TimeSlot;
  location!: Location;
  view: CalendarView = CalendarView.Week;
  timeSlots:TimeSlot[] = [];
  schedule: Schedule[] =[]
  Locations: Location[]=[];
  FilteredLocations : Location[]=[]; 
  bookingtyps: BookingType[]=[];
  filteredTimeSlots: TimeSlot[]=[]
  filteredByDate: TimeSlot[]=[]
  Passengers: Passenger[]=[]
  Luggage = ['Normal','Abnormal']
  
  TripAmount:number = 0
  displayStyle = "none";
  refresh = new Subject<void>();
  selectedtime:any;
  constructor(private dataService: DataService, private router: Router, private snackBar:MatSnackBar, public sharednavservice:SharedNavService, private helpService:HelpParagraphService){
    helpService.showBooking = true;
    helpService.showRental = false;
    helpService.showTravel = false;
  }
  viewDate = new Date();
  DepatureDate:string = "";
  LocationName:number= 0;
  DepartureTime:number= 0;
  BookingTypeName:number=0;
  name:string="";
  surname:string="";
  passengersnum:number = 1;
  luggageSize:string = ""
  currentDate!:any;
  events: CalendarEvent[] = [];
  starthours!:string;
  startminutes!:string;
  endhours!:string;
  endminutes!:string;
  AllSchedules: any;
  date!:string;
  selectedlocation:any;
  departureDate!:string;

  ShuttleForm: FormGroup = new FormGroup({
    Location: new FormControl('', [Validators.required]),
    luggage: new FormControl('', [Validators.required]),
    BookingType: new FormControl('', [Validators.required]),
    PassengerName: new FormControl('',[Validators.required]),
    PassengerSurname: new FormControl('',[Validators.required]),
    PassengerNumber: new FormControl('',[Validators.required,  Validators.pattern(/0\d{9}$/)])
  })

  ngOnInit():void{
    //this.GoBack();
    this.sharednavservice.hideSideNav = true;
  this.sharednavservice.hideToolBar = true;
    this.GetAllBookingTypes();
    this.GetAllLocations();
    this.GetTimeSlots();
    this.GetSchedule();

    this.Passengers.push({passengerID: 0, name: '', surname:'', phoneNumber: '', userID: 0})

  }
  // GoBack(route: string): void {
  //   this.router.navigate([route]);
  // }



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

  eventClicked({ event }: { event: CalendarEvent }): void {

    let now =  formatDate(new Date(), 'yyyy-MM-dd', 'en');
    let date =  formatDate(new Date(event.start), 'yyyy-MM-dd', 'en');

    if (now <= date)
    {
      Swal.fire({
        icon: 'info',
        title: 'Time Slot Selected',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      this.selectedtime = event.id;
    }
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
    this.timeSlots.forEach((element) => {
      if (element.locationID == this.selectedlocation)
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

  //filtering
  filter(event : any):void{

    this.events = [];
    this.selectedlocation = event.target.value;
    
    //Get Current Date
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    
    this.dataService.GetSchedule().subscribe(result => 
      {
        this.schedule = result;

        this.dataService.GetAllTimeslots().subscribe(result => 
          {
            this.timeSlots = result;

            this.dataService.GetAllLocations().subscribe( result =>
              {
                this.FilteredLocations = result;

                this.schedule.forEach(element => {


                  console.log(element);
                  this.timeslot = this.timeSlots.find(x => x.timeslotID == element.timeSlotID)!;
                  this.location = this.FilteredLocations.find(x => x.locationID == element.locationID)!;

                  if (this.selectedlocation == this.location.locationID)
                  {
                    this.date =  formatDate(new Date(this.timeslot.departureDate), 'yyyy-MM-dd', 'en');
                    let now =  formatDate(new Date(), 'yyyy-MM-dd', 'en');

                    if (now <= this.date)
                    {
                      //Time slots created prior to the current date cannot be edited
                      this.events = [
                        ...this.events,
                        {
                          title: this.location.city!,
                          id: element.scheduleID,
                          start: setHours(setMinutes(new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime), new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime).getMinutes()), new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime).getHours()),
                          end: setHours(setMinutes(new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime), new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime).getMinutes()), new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime).getHours()),
                          color: colors.green,
                          draggable: false,
                          resizable: {
                            beforeStart: false,
                            afterEnd: false,
                          },
                        },
                      ];
                      }
                      else 
                      {
                         //Time slots created prior to the current date cannot be edited
                      this.events = [
                        ...this.events,
                        {
                          title: this.location.city!,
                          id: element.scheduleID,
                          start: setHours(setMinutes(new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime), new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime).getMinutes()), new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime).getHours()),
                          end: setHours(setMinutes(new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime), new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime).getMinutes()), new Date(this.timeslot.departureDate!+'T'+ '00:'+this.timeslot.departureTime).getHours()),
                          color: colors.black,
                          draggable: false,
                          resizable: {
                            beforeStart: false,
                            afterEnd: false,
                          },
                        },
                      ];
                      }
                      console.log(this.events)
                  }

                });

                console.log(this.events)
                
              }
            )
          }
    
        )

       
      } 
    ) 


    console.log(this.events);
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

  if (this.ShuttleForm.valid)
  {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Your shuttle booking progress has been saved', 'X', { duration: 3000 , verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload() 
    });

  }
  else {

    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Please check that you have selected and entered details for all fields', 'X', { duration: 3000 , verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload()
    });

  }

  //Filter schedule first to find available seats
  this.dataService.GetSchedule().subscribe(result => 
    {
      this.schedule = result;
  if (this.schedule.find(x => x.scheduleID == this.selectedlocation)!.available_seats < this.passengersnum){
    alert("There are only " + this.schedule.find(x => x.scheduleID == this.selectedlocation)!.available_seats + " available seats for this booking.")
  }
  // if enough seats are available
  else{

    var bookingObject:Booking = new Booking;

    bookingObject.bookingID = 0
    bookingObject.locationID = this.LocationName //this?
    bookingObject.bookingStatusID = 0
    bookingObject.bookingTypeId = this.BookingTypeName
    bookingObject.date = new Date(Date.now())
    bookingObject.scheduleId = this.selectedlocation
    bookingObject.serviceId = 1
    bookingObject.travelpackageId  = 0
    bookingObject.userID =   +localStorage.getItem("userID")!
    var bookingAmount = this.getBookingPrice()
    bookingObject.totalPrice = bookingAmount*this.passengersnum
    //bookingObject.email = localStorage.getItem('email')!

    console.log(bookingObject);
    if (this.luggageSize == "Abnormal"){
      bookingObject.totalPrice += 75
    }

    localStorage.setItem("DepartureDate", this.DepatureDate)
    localStorage.setItem("Booking", JSON.stringify(bookingObject))
    localStorage.setItem("Passengers", JSON.stringify(this.Passengers))


    this.router.navigate(['/make-payment'])
  }

})

}




    //Modal Open and Close Functions
    openPopup() {
      this.displayStyle = "block";

    }

    closePopup() {
      this.displayStyle = "none";
    }




}
