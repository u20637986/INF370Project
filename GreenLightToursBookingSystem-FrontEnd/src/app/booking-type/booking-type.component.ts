import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingType } from '../shared/bookingtype';
import { DataService } from '../service/GLBSdataservice';

@Component({
  selector: 'app-booking-type',
  templateUrl: './booking-type.component.html',
  styleUrls: ['./booking-type.component.scss']
})
export class BookingTypeComponent implements OnInit {

  bookingTypes: BookingType[]=[]

  constructor(private dataService: DataService, private router:Router){}


  ngOnInit(): void {
    this.GetAllBookingTypes()

  }

  GetAllBookingTypes()
  {
    this.dataService.GetAllBookingTypes().subscribe(result => {
      let bookingTypeList:any[] = result
      bookingTypeList.forEach((element) => {
        this.bookingTypes.push(element)
      });
    })
  }

  DeleteBookingType(BookingTypeID: Number){
    this.dataService.DeleteBookingType(BookingTypeID).subscribe(result => {
      window.location.reload();
      });
    }


}
