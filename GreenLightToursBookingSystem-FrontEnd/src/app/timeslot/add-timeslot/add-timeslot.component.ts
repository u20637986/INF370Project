import { Time } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { TimeSlot } from 'src/app/shared/timeslot';

@Component({
  selector: 'app-add-timeslot',
  templateUrl: './add-timeslot.component.html',
  styleUrls: ['./add-timeslot.component.scss']
})
export class AddTimeslotComponent implements OnInit {

  TimeSlotForm!:FormGroup;
  location!: any


    constructor(private dataService: DataService, private router: Router, public formBuilder:FormBuilder) {
      this.TimeSlotForm = formBuilder.group({
        departureTime: ['', Validators.required],
        departureDate: ['', Validators.required],
        locationID: [0, Validators.required]
      })

      dataService.GetAllLocations().subscribe((res) => {
        this.location = res
      })
     }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/timeslot'])
    }
    AddTimeSlot(){
      if(this.TimeSlotForm.valid){
        const timeslot = {
          departureDate: this.TimeSlotForm.value.departureDate,
          departureTime: this.TimeSlotForm.value.departureTime,
          locationID: this.TimeSlotForm.value.locationID
        };

        this.dataService.AddTimeslot(timeslot).subscribe(()=>{
          this.router.navigate(['/timeslot'])
        })
      }
    }


  }
