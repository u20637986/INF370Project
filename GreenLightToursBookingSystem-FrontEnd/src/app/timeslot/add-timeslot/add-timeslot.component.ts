import { Time } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { TimeSlot } from 'src/app/shared/timeslot';

@Component({
  selector: 'app-add-timeslot',
  templateUrl: './add-timeslot.component.html',
  styleUrls: ['./add-timeslot.component.scss']
})
export class AddTimeslotComponent implements OnInit {

  timeslot: TimeSlot = {
    timeslotID:0,
    departureTime:'',
    departureDate: '',
    locationID: 0,
  };

  TimeSlotForm = new FormGroup(
    {
        name: new FormControl(''),
        description: new FormControl('')
    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/employee-type'])
    }
    AddTimeSlot(){
      this.dataService.AddTimeslot(this.timeslot).subscribe({
        next:(timeslot) => {

          timeslot.name = this.TimeSlotForm.value.name;
          timeslot.description = this.TimeSlotForm.value.description;

         this.router.navigate(['/timeslot'])
        }
      })
    }


  }
