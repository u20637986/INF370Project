import { Component, OnInit } from '@angular/core';
import { Booking } from '../shared/Bookings';
import { DataService } from '../service/GLBSdataservice';
import { Passenger } from '../shared/passenger';
import { Router } from '@angular/router';
import { EmailModel } from '../shared/emailModel';
import { elements } from 'chart.js';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private dataservices: DataService, private router: Router){}

  //  dearString:string = 'Dear Valued client'
  // emailTo: string =  localStorage.getItem("UserEmail")!
  // subject: string = 'DO NOT REPLY TO THIS MESSAGE SENDER: Booking Ticket Detail'; // Set your predefined subject here
  // content: string = ''

  booking:Booking = new Booking
  bookingId = this.booking.bookingID;
  Passenger:Passenger[]=[]
  ngOnInit(): void {

    if (JSON.parse(localStorage.getItem("Page")!) == "Payment")
    {
      
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
     
     this.SendEmail(localStorage.getItem('email')!)
     //email code 
    }
    if (JSON.parse(localStorage.getItem("Page")!) == "Travel Booking")
    {
      this.booking =  JSON.parse(localStorage.getItem("Travel_Booking",)!)
    this.Passenger = JSON.parse(localStorage.getItem("TravelPackagePassengers",)!)
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
     this.SendEmail(localStorage.getItem('email')!)

    }
  

    //email code
  
    
    
  }
  

 
  
  redirectToMakeBooking(): void {
    window.location.href="./view-booking";
  
  }

  SendEmail(email:string) {
    this.dataservices.SendEmail(email).subscribe(
      (response:any) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
        
      }
    );
  }
 
}


