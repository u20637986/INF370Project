import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripType } from '../shared/trip-type';
import { DataService } from '../service/GLBSdataservice';



@Component({
  selector: 'app-trip-type',
  templateUrl: './trip-type.component.html',
  styleUrls: ['./trip-type.component.scss']
})
export class TripTypeComponent implements OnInit {
  tripTypes:TripType[] = []

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllTripTypes()
  }

  GetAllTripTypes()
  {
    this.dataService.GetAllTripTypes().subscribe(result => {
      let tripTypeList:any[] = result
      tripTypeList.forEach((element) => {
        this.tripTypes.push(element)
      });
    })
  }

  DeleteTripType(TripTypeID: Number){
    this.dataService.DeleteTripType(TripTypeID).subscribe(result => {
      window.location.reload();
      });
    }
}
