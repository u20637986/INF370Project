import { Component,OnInit } from '@angular/core';
import { Booking } from 'src/app/shared/Bookings';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.scss']
})
export class ViewBookingComponent implements OnInit{
  booking:Booking[] = []
  booking1:Booking = new Booking


  constructor(private dataService: DataService, private router:Router) { }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  BookingStatus = ['Cancelled','Cancelled, Awaiting refund','Refunded','Paid','UPaid']
  ngOnInit(): void {
    this.GetBookingByUserId()
  }

  GetBookingByUserId(){
    this.dataService.GetBookingByUserId(+localStorage.getItem("userID")!).subscribe( (result)=>{
      var temp:[] = result
      
      temp.forEach((element: Booking)=>{
        this.booking.push(element)
      })
      
    })
    console.log(this.booking)
  }

  GetAllBookings()
  {
    this.dataService.GetAllBookings().subscribe( (res) => {
        this.booking = res as Booking[];
    });
  }


  CancelBooking(bookingID: number){
   this.booking.forEach( (element)=>{
    if (element.bookingID == bookingID){
      element.bookingStatusID = 1
      this.dataService.EditBookingStatus(bookingID, element).subscribe((response)=>{
        console.log(response)
      })
    }
   })

    
  }


}


