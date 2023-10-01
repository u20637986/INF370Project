import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';

@Component({
  selector: 'app-update-trip-type',
  templateUrl: './update-trip-type.component.html',
  styleUrls: ['./update-trip-type.component.scss']
})
export class UpdateTripTypeComponent implements OnInit{
  tripType!:any;

  TripTypeForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private dataService:DataService, private router:Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.dataService.getTripType(+this.route.snapshot.params['tripTypeID']).subscribe((res) =>{
      this.tripType = res;
      this.TripTypeForm.patchValue({
        name: this.tripType.name,
        description: this.tripType.description
      })
    })
  }

  cancel(){
    this.router.navigate(['/trip-type'])
  }

  onSubmit(){
    this.dataService.UpdateTripType(this.tripType.tripTypeID, this.TripTypeForm.value)
    .subscribe((res) => {
      this.router.navigate(['/trip-type'])
    })
  }
}
