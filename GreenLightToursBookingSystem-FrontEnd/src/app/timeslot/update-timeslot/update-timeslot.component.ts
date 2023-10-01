import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';

@Component({
  selector: 'app-update-timeslot',
  templateUrl: './update-timeslot.component.html',
  styleUrls: ['./update-timeslot.component.scss']
})
export class UpdateTimeslotComponent implements OnInit {
  timeslot:any;
  location!:any;

  TimeSlotForm = new FormGroup({
    departureDate: new FormControl(''),
    departureTime: new FormControl(''),
    locationID: new FormControl(0)
  })

  constructor(private dataService: DataService, private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.dataService.getTimeslot(+this.route.snapshot.params['timeslotID']).subscribe((res) => {
      this.timeslot = res;
      this.TimeSlotForm.patchValue({
        departureDate: this.timeslot.departureDate,
        departureTime: this.timeslot.departureTime,
        locationID: this.timeslot.locationID
      });
    });

    this.dataService.GetAllLocations().subscribe((res) => {
      this.location = res
    })
  }

  cancel(){
    this.router.navigate(['/timeslot']);
  }

  onSubmit(){
    this.dataService.UpdateTimeslot(this.timeslot.timeslotID, this.TimeSlotForm.value).subscribe((res) => {
      this.router.navigate(['/timeslot']);
    })
  }
}
