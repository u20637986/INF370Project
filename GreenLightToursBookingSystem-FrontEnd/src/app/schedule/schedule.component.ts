import { Component } from '@angular/core';
import { DataService } from '../service/GLBSdataservice';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {

  constructor(private data:DataService, private router : Router) { }

  //Creating the form 

  ScheduleForm: FormGroup = new FormGroup({
    scheduleDate: new FormControl('', [Validators.required]),
    availableSeats: new FormControl(0,[Validators.required]),
    TimeSlotID: new FormControl(0,[Validators.required]),
    LocationID: new FormControl(0,[Validators.required]),
    VehicleID: new FormControl(0,[Validators.required]),
    DriverID: new FormControl(0,[Validators.required])

  })


}
