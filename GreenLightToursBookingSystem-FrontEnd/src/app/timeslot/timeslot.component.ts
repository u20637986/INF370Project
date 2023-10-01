import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeSlot } from '../shared/timeslot';
import { DataService } from '../service/GLBSdataservice';


@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.scss']
})
export class TimeslotComponent implements OnInit {
  timeslots:TimeSlot[] = []

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllTimeSlots()
  }

  GetAllTimeSlots()
  {
    this.dataService.GetAllTimeslots().subscribe(result => {
      let  timeslotList:any[] = result
      timeslotList.forEach((element) => {
        this. timeslots.push(element)
      });
    })
  }

  DeleteTimeSlot(TimeSlotID: Number){
    this.dataService.DeleteTimeslot(TimeSlotID).subscribe(result => {
      window.location.reload();
      });
    }
}
