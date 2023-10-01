import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { BookingType } from 'src/app/shared/bookingtype';

@Component({
  selector: 'app-add-booking-type',
  templateUrl: './add-booking-type.component.html',
  styleUrls: ['./add-booking-type.component.scss']
})
export class AddBookingTypeComponent implements OnInit {

  bookingType: BookingType = {
    bookingTypeID:0,
    name: '',
    description:''
  };

  BookingTypeForm = new FormGroup(
    {
        name: new FormControl(''),
        description: new FormControl('')
    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/booking-type'])
    }
    AddBookingType(){
      this.dataService.AddBookingType(this.bookingType).subscribe({
        next:(bookingType) => {

         bookingType.name = this.BookingTypeForm.value.name;
         bookingType.description = this.BookingTypeForm.value.description;

         this.router.navigate(['/booking-type'])
        }
      })
    }


  }




