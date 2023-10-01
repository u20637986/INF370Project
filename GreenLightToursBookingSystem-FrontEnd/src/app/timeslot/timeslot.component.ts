import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeSlot } from '../shared/timeslot';
import { DataService } from '../service/GLBSdataservice';
import { TimeslotLocation } from '../shared/timeslot-location';
import { Location } from '../shared/location';


@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.scss']
})
export class TimeslotComponent implements OnInit {
  timeslots:TimeslotLocation[] = []

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllTimeSlots()
  }

  GetAllTimeSlots()
  {
    this.dataService.GetAllTimeslots().subscribe(result => {
      let  timeslotList:any[] = result
      timeslotList.forEach((element) => {
        //this. timeslots.push(element)
        let motor : TimeslotLocation = element

        this.dataService.GetAllLocations().subscribe((location) => {
          let city: Location[] = location;
          let cityName = city.find(cityName => cityName.locationID === motor.locationID);
          if(cityName){
            motor.city = cityName.city;
            this.timeslots.push(motor)
          }
        })
      });
    })
  }

  DeleteTimeSlot(TimeSlotID: Number){
    this.dataService.DeleteTimeslot(TimeSlotID).subscribe(result => {
      window.location.reload();
      });
    }
}
