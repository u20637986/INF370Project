import { Component, OnInit } from '@angular/core';
import { Booking } from '../shared/Bookings';
import { DataService } from '../service/GLBSdataservice';
import { Passenger } from '../shared/passenger';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private dataservices: DataService){}

  booking:Booking = new Booking
  Passenger:Passenger[]=[]
  ngOnInit(): void {
    this.booking =  JSON.parse(localStorage.getItem("Booking",)!)
    this.Passenger = JSON.parse(localStorage.getItem("Passengers",)!)
    this.booking.bookingStatusID = 4
     
    this.Passenger.forEach((element)=>{
      element.userID = this.booking.userID

      this.dataservices.AddPassenger(element).subscribe((response:any) =>{
        if (response.statusCode == "ok"){
          console.log("passenger saved")
        }
        else{
          console.log("passenger not saved")
        }
      })
    })
    this.dataservices.AddBooking(this.booking).subscribe((response:any) => {

      if(response.statusCode == 200)
      {
        alert("Booking has been saved. See you during collection")
      }
      else
      {
        // alert("Something went wrong when saving your booking.Please try again");
        console.log(response)
      
      }
     });
  }

}
