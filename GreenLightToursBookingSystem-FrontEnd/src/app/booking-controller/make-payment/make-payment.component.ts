import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Booking } from 'src/app/shared/Bookings';
import { Discount } from 'src/app/shared/discount';
import { Passenger } from 'src/app/shared/passenger';
import { Md5 } from 'ts-md5';
//import {  HttpHeaders, RequestMode } from '@angular/common/http';
declare function payfast_do_onsite_payment(param1 : any, callback: any): any;



@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit{

  //local variables
  booking:Booking = new Booking
  passengers:Passenger[] = []
  departureDate:string = ""
  totalPassengers:number = 0
  discounts:Discount[] = []
  DiscountAmount:number = 0
  http: any;

  

  constructor(private httpComms : HttpClient, private router: Router, private dataservices: DataService, private formBuilder: FormBuilder){}

  // makeNoCorsRequest(url: string): Observable<any> {
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     mode: 'no-cors' as RequestMode
  //   };

  //   return this.http.get(url, options);
  // }
  
  ngOnInit(): void {
    localStorage.setItem("Page",JSON.stringify("Payment") )

    this.booking = JSON.parse(localStorage.getItem("Booking")!)
    this.passengers = JSON.parse(localStorage.getItem("Passengers")!)
    this.departureDate = localStorage.getItem("DepartureDate")!
    this.totalPassengers = this.passengers.length
    this.GetDiscounts()
    console.log(this.booking.totalPrice)

  }
  // GoBack(route: string): void {
  //   this.router.navigate([route]);
  // }
 
  
  GetDiscounts(){
    this.dataservices.GetAllDiscounts().subscribe( (result) =>{
      let temp:any[] = result
      temp.forEach((element)=>{
        this.discounts.push(element)
      }) 
    })
  }

  ApplyDiscount(){
    this.booking.totalPrice = this.booking.totalPrice-this.DiscountAmount
    localStorage.setItem("Booking",JSON.stringify(this.booking) )
  }

  FinaliseBooking(){
    var newBooking= new Booking
  
    this.dataservices.AddBooking(this.booking).subscribe( (response:any)=>{
      console.log(response);
  })
    console.log(this.booking);
  }

  

  



 

}
